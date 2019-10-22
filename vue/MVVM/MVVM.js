class Compile {
  constructor(el, data) {
    //判断是不是元素，不是元素获取他
    this.el = this.isElementNode(el) ? el : document.querySelector(el);

    //把当前节点中的元素 获取到 放到内存中 (避免回流，重绘制)
    let fragment = this.nodeToFragment(this.el);

    //把节点重的内容进行替换

    // 把内容在放到页面中
    this.el.appendChild(fragment);
  }
  //把节点移动到内存中
  nodeToFragment(node) {
    // 创建一个文档碎片
    let fragment = document.createDocumentFragment();
    let firstChild;
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

class Vue {
  constructor({ el, data }) {
    this.$el = el;
    this.$data = data;
    new Compile(this.$el, this.$data);
  }
}
