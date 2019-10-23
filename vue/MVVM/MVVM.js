class Compiler {
  constructor(el, vm) {
    this.vm = vm;
    //判断是不是元素，不是元素获取他
    this.el = this.isElementNode(el) ? el : document.querySelector(el);

    //把当前节点中的元素 获取到 放到内存中 (避免回流，重绘制)
    let fragment = this.nodeToFragment(this.el);

    //

    // 用数据编译模版 1.找到对应节点的指令，{{}} ；2. 把节点指令，{{}} 中的内容进行替换
    this.compile(fragment);
    // 把内容在放到页面中
    this.el.appendChild(fragment);
  }
  /**是否是vue的指令 */
  isDirective(str) {
    return str.startsWith("v-");
  }
  /**编译文本 */
  compileText(node) {
    //判断是否有{{}}
    let content = node.textContent;
    if (/\{\{(.+?)\}\}/.test(content)) {
      compileUtil["text"](node, content, this.vm);
    }
  }
  /**编译元素,判断是否有指令 */
  compileElement(node) {
    let attributes = node.attributes; //类数组
    [...attributes].forEach(attr => {
      let { name, value: expr } = attr;
      if (this.isDirective(name)) {
        //name 可能是 v-model, v-html, v-bind
        //判断是否有指令，单独处理
        console.log("compileElement", name, expr);
        let [, directive] = name.split("-");
        //调用对应的指令处理
        compileUtil[directive](node, expr, this.vm);
      }
    });
  }

  compile(node) {
    let childNodes = node.childNodes; //第一层子节点
    [...childNodes].forEach(child => {
      if (this.isElementNode(child)) {
        this.compileElement(child);
        //元素的话，要去继续遍历子节点
        this.compile(child);
      } else {
        this.compileText(child);
      }
    });
  }

  //把节点移动到内存中
  nodeToFragment(node) {
    // 创建一个文档碎片
    let fragment = document.createDocumentFragment();
    let firstChild;
    //node的节点一个个变少
    while ((firstChild = node.firstChild)) {
      // appendChild具有移动性
      fragment.appendChild(firstChild);
    }
    return fragment;
  }
  //判断是否是一个节点
  isElementNode(el) {
    return el.nodeType === 1;
  }
}

compileUtil = {
  /**取实例上$data的 对应的值*/
  getValue(vm, expr) {
    // vm.$data  'school.name'
    return expr.split(".").reduce((data, current) => {
      return data[current.trim()];
    }, vm.$data);
  },
  /**
   *
   * @param {*} node 当前节点
   * @param {*} expr 表达式
   * @param {*} vm 当前实例子 vue
   */
  model(node, expr, vm) {
    //给输入框赋予value属性， node.value = XXX;
    let fn = this.updater["modelUpdater"];
    let value = this.getValue(vm, expr);
    fn(node, value);
  },
  html() {},
  bind() {},
  text(node, expr, vm) {
    // expr可能是{{a}} ,{{b}} {{a.b}}
    let fn = this.updater["modelText"];
    let value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      return this.getValue(vm, args[1]);
    });
    fn(node, value);
  },
  //把数据插入到节点中
  updater: {
    modelUpdater(node, value) {
      node.value = value;
    },
    htmlUpdater() {},
    modelText(node, value) {
      node.textContent = value;
    }
  }
};

class Vue {
  constructor({ el, data }) {
    this.$el = el;
    this.$data = data;
    //这个根元素存在，编译模版
    if (this.$el) {
      new Compiler(this.$el, this);
    }
  }
}
