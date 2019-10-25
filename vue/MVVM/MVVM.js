//观察者，(发布 订阅)被观察者
class Dep {
  constructor() {
    this.subs = []; // 存放所有的watcher
  }
  /** 订阅 */
  addSub(watcher) {
    this.subs.push(watcher);
  }
  /**发布 */
  notify() {
    this.subs.forEach(watcher => watcher.update());
  }
}
class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm;
    this.expr = expr;
    this.cb = cb;
    //默认存放一个老值
    this.oldValue = this.get();
  }
  get() {
    Dep.target = this;
    let value = compileUtil.getValue(this.vm, this.expr); //new Watcher()的就会调用observer对应属性中的get了，这个时候会把wathcher 放到dep的数组中 （js单线程）
    Dep.target = null;
    return value;
  }
  update() {
    // 更新操作， 数据变化后  会调用 观察者的update方法
    let newVal = compileUtil.getValue(this.vm, this.expr);
    if (newVal != this.oldValue) {
      this.cb(newVal);
    }
  }
}
//实现数据劫持 (给每个属性设置get set)
class Observer {
  constructor(data) {
    this.observer(data);
  }
  observer(data) {
    if (data && typeof data == "object") {
      for (let key in data) {
        this.defineReactive(data, key, data[key]);
      }
    }
  }
  defineReactive(obj, key, value) {
    this.observer(value); //value可能是对象
    const dep = new Dep();
    Object.defineProperty(obj, key, {
      get() {
        Dep.target && dep.addSub(Dep.target); //添加订阅
        return value;
      },
      set: newValue => {
        if (newValue !== value) {
          this.observer(value); //新值有可能是对象所以
          value = newValue;
          dep.notify(); // 发布订阅
        }
      }
    });
  }
}

class Compiler {
  constructor(el, vm) {
    this.vm = vm;
    //判断是不是元素，不是元素获取他
    this.el = this.isElementNode(el) ? el : document.querySelector(el);

    //把当前节点中的元素 获取到 放到内存中 (避免回流，重绘制)
    let fragment = this.nodeToFragment(this.el);

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
        //name 可能是 v-model, v-html, v-bind,
        //判断是否有指令，单独处理
        console.log("compileElement", name, expr);
        let [, directive] = name.split("-");
        let [directiveName, eventName] = directive.split(":"); //v-on:click
        //调用对应的指令处理
        compileUtil[directiveName](node, expr, this.vm, eventName);
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
  /**事件 */
  on(node, expr, vm, eventName) {
    //v-on:click='change' expr =>change
    node.addEventListener(eventName, e => {
      vm[expr].call(vm, e);
    });
  },
  /**取实例上$data的 对应的值*/
  getValue(vm, expr) {
    // vm.$data  'school.name'
    return expr.split(".").reduce((data, current) => {
      return data[current.trim()];
    }, vm.$data);
  },
  /**设置$data的对应的值 */
  setValue(vm, expr, value) {
    return expr.split(".").reduce((data, current, index, arr) => {
      if (arr.length - 1 === index) {
        data[current.trim()] = value;
      }
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
    new Watcher(vm, expr, newVal => {
      //给输入框加一个观察者，如果稍后数据更新会出发回调
      fn(node, newVal);
    });
    //实现数据的双向绑定
    node.addEventListener("input", event => {
      this.setValue(vm, expr, event.target.value);
    });
    let value = this.getValue(vm, expr);
    fn(node, value);
  },

  html(node, expr, vm) {
    let fn = this.updater["htmlUpdater"];
    let value = this.getValue(vm, expr);
    new Watcher(vm, expr, newVal => {
      fn(node, newVal);
    });
    fn(node, value);
  },
  bind() {},

  getContentValue(vm, expr) {
    return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      return this.getValue(vm, args[1]);
    });
  },
  text(node, expr, vm) {
    // expr可能是{{a}} ,{{b}} {{a.b}}, 名字{{a,b}},名字{{ person.name }}今年{{ person.age }}岁
    let fn = this.updater["modelText"];
    let value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      new Watcher(vm, args[1], () => {
        //fn(node, newVal); //这边这样写的话 名字{{ person.name }}今年{{ person.age }}岁 person的name 和age属性一个更新就会更新成单独的更新的那个属性
        fn(node, this.getContentValue(vm, expr)); //直接把整个文本节点都更新
      });
      return this.getValue(vm, args[1]);
    });
    fn(node, value);
  },
  //把数据插入到节点中
  updater: {
    modelUpdater(node, value) {
      node.value = value;
    },
    htmlUpdater(node, value) {
      node.innerHTML = value;
    },
    modelText(node, value) {
      node.textContent = value;
    }
  }
};

class Vue {
  constructor(options) {
    this.$el = options.el;
    this.$data = options.data;
    let computed = options.computed;
    let methods = options.methods;
    //这个根元素存在，编译模版
    if (this.$el) {
      // 把数据 全部转化为Object.defineProperty来定义//所以vue需要ie8以上
      new Observer(this.$data);
      // vm上取值操作代理到 vm.$data上
      this.proxyVm(this.$data);

      //把计算属性挂载到$data上 因为他渲染的时候是compileText，通过getValue()取值的
      for (let key in computed) {
        Object.defineProperty(this.$data, key, {
          get: () => {
            return computed[key].call(this); //computed中的this指的是vue的实例，所以改变箭头指向
          }
        });
      }
      //方法挂载到vue实例子上 函数的指向在compileUtil[on]中函数调用的时候做的
      for (let key in methods) {
        Object.defineProperty(this, key, {
          get() {
            return methods[key];
          }
        });
      }

      // 数据挂载
      new Compiler(this.$el, this);
    }
  }
  /**给vm上做key代理到data[key]上 */
  proxyVm(data) {
    for (let key in data) {
      Object.defineProperty(this, key, {
        get() {
          return data[key];
        },
        set(value) {
          data[key] = value;
        }
      });
    }
  }
}
