import { setAttr } from "./util";
class Element {
  constructor(type, props, children) {
    this.type = type;
    this.props = props;
    this.children = children;
  }
}

function createElement(type, props, children) {
  return new Element(type, props, children);
}

/** render 方法把vnode 转化真实dom */
function render(eleObj) {
  let ele = document.createElement(eleObj.type);
  for (let key in eleObj.props) {
    //设置属性
    setAttr(ele, key, eleObj.props[key]);
  }
  eleObj.children.forEach(children => {
    const rendChildren =
      children instanceof Element
        ? render(children)
        : document.createTextNode(children);
    ele.appendChild(rendChildren);
  });
  return ele;
}

/**把虚拟dom挂载到真实dom上*/
function renderDom(el, target) {
  target.appendChild(el);
}

export { createElement, render, Element, renderDom };
