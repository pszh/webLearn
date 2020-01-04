import { Element, render } from "./element";
import { setAttr } from "./util";
let allPathes;
let index = 0; // 默认从第0个开始

function patch(node, patches) {
  //给某个元素打补丁
  allPathes = patches;

  walk(node);
}

function walk(node) {
  let currentPatch = allPathes[index++];
  //循环遍历所有子节点
  let childNodes = node.childNodes;
  childNodes.forEach(child => walk(child));
  if (currentPatch) {
    // 因为没有改动的时候是undefined
    doPatch(node, currentPatch);
  }
}

function doPatch(node, patches) {
  patches.forEach(patch => {
    switch (patch.type) {
      case "ATTRS":
        for (let key in patch.attrs) {
          let value = patch.attrs[key];
          if (value) {
            setAttr(node, key, value);
          } else {
            node.removeAttribute(key);
          }
        }
        break;
      case "TEXT":
        node.textContent = patch.text;
        break;
      case "REMOVE":
        node.parentNode.removeChild(node);
        break;
      case "REPLACE":
        let newNode =
          patch.newNode instanceof Element
            ? render(patch.newNode)
            : document.createTextNode(patch.newNode);
        node.parentNode.replaceChild(newNode, node);
        break;
      default:
        break;
    }
  });
}

export default patch;
