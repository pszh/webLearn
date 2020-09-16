const path = require("path");
const fs = require("fs");
const babylon = require("babylon"); // babylon 源码转换ast
const traverse = require("@babel/traverse").default; //@babel/traverse 遍历节点
let t = require("@babel/types"); //@babel/types  替换
let generator = require("@babel/generator").default; //@babel/generator 生成新ast
const ejs = require("ejs");
const { SyncHook } = require("tapable");
class Compiler {
  constructor(config) {
    this.config = config;
    // 保存入口文件路径
    this.entryId;
    // 保存所有模块依赖
    this.modules = {};
    this.entry = this.config.entry; // 入口路径
    // 项目当前工作路径
    this.root = process.cwd();
    this.hooks = {
      entryOption: new SyncHook(),
      compile: new SyncHook(),
      afterCompile: new SyncHook(),
      afterPulgins: new SyncHook(),
      run: new SyncHook(),
      emit: new SyncHook(),
      done: new SyncHook(),
    };
    // 如果传递了plugins参数
    const plugins = config.plugins;
    if (Array.isArray(plugins)) {
      plugins.forEach((plugin) => {
        plugin.apply(this);
      });
    }
    this.hooks.afterPulgins.call();
  }

  /**
   * // 获取模块内容
   * @param {*} modulePath
   */
  getSource(modulePath) {
    let content = fs.readFileSync(modulePath, "utf-8");
    //是否需要loader转换
    let rules = this.config.module.rules;
    for (let i = rules.length - 1; i >= 0; i--) {
      // loader执行顺序从下到上，从右到左
      let rule = rules[i];
      const { test, use } = rule;
      let len = use.length - 1;
      if (test.test(modulePath)) {
        // 如果匹配上loader中的，需要通过loader来转化
        function normalLoader() {
          let loader = require(use[len--]);
          content = loader(content);
          if (len >= 0) {
            // 递归调用loader 实现转化
            normalLoader();
          }
        }
        normalLoader();
      }
    }
    return content;
  }
  /**
   * 解析源码
   * @param {*} source 源码
   * @param {*} parentPath 父路径
   */
  parse(source, parentPath) {
    // AST解析语法树
    const ast = babylon.parse(source);
    let dependencies = []; // 依赖的数组
    traverse(ast, {
      CallExpression(p) {
        // a() require()
        let node = p.node; // 对应的节点
        if (node.callee.name === "require") {
          node.callee.name = "__webpack_require__";
          let moduleName = node.arguments[0].value; // 取到依赖模块的名字
          moduleName = moduleName + (path.extname(moduleName) ? "" : ".js"); // 名字给上后缀
          moduleName = `./${path.join(parentPath, moduleName)}`; //'./src/name.js'
          dependencies.push(moduleName);
          node.arguments = [t.stringLiteral(moduleName)];
        }
      },
    });
    let sourceCode = generator(ast).code;

    return { sourceCode, dependencies };
  }
  /**
   * 构建模块
   * @param {Stirng} modulePath  当前模块的绝对路径
   * @param {Boolean} isEntry  是否是入口文件
   */
  buildModule(modulePath, isEntry) {
    let source = this.getSource(modulePath);
    //  模块id modulePath = modulePath - this.root
    let moduleName = `./${path.relative(this.root, modulePath)}`;
    if (isEntry) {
      this.entryId = moduleName; // 入口文件保存入口名字
    }

    // 解析源码，把source中源码require映射为__webpack_require__，返回一个依赖列表
    let { sourceCode, dependencies } = this.parse(
      source,
      path.dirname(moduleName)
    ); // ./src

    // console.log(sourceCode, dependencies);

    // 相对路径和模块中的内容 对应起来
    this.modules[moduleName] = sourceCode;

    dependencies.forEach((dep) => {
      // 附模块的递归加载
      this.buildModule(path.join(this.root, dep), false);
    });
  }
  /** 生成打包文件 */
  emitFile() {
    // 用数据{this.entryId, this.modules}渲染模版
    const main = path.join(
      this.config.output.path,
      this.config.output.filename
    );
    let templateStr = this.getSource(path.join(__dirname, "templeate.ejs"));
    let code = ejs.render(templateStr, {
      entryId: this.entryId,
      modules: this.modules,
    });
    this.assets = {};
    //资源中 路径对应的代码
    this.assets[main] = code;
    fs.writeFileSync(main, this.assets[main]);
  }

  run() {
    this.hooks.run.call();
    // 执行, 并且创建模块的依赖关系
    this.hooks.compile.call();
    this.buildModule(path.resolve(this.root, this.entry), true);
    this.hooks.afterCompile.call();
    // 发射一个打包后的文件
    this.emitFile();
    this.hooks.emit.call();
    this.hooks.done.call();
  }
}
module.exports = Compiler;
