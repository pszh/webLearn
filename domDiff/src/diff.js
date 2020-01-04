import { isString } from "./util";
/**
 * 规则:
 * 当节点类型相同，去看下属性是否相同， 产生一个属性的补丁包{ type:'ATTRS',attrs:{class:'list-group}}
 * 新dom节点不存在 {type:'REMOVE',index:xxx}
 * 节点类型不相同 直接采用替换模式{ type:'REPLACE', newNode: newNode}
 * 文本的变化{type:'TEXT',text:1}
 */

function diff(oldTree, newTree) {
  let patches = {};

  //递归树，比较后的结果放布丁包中
  walk(oldTree, newTree, 0, patches);

  return patches;
}

/**比较属性的差异 */
function diffAttr(oldAttrs, newAttrs) {
  let patch = {};
  for (let key in oldAttrs) {
    if (oldAttrs[key] !== newAttrs[key]) {
      patch[key] = newAttrs[key]; // 有可能为undefinder
    }
  }
  for (let key in newAttrs) {
    //老节点没有新节点属性
    if (!oldAttrs.hasOwnProperty(key)) {
      patch[key] = newAttrs[key];
    }
  }
  return patch;
}

function diffChildren(oldChildren, newChildren, patches) {
  // 比老得第一个和新的第一个
  oldChildren.forEach((child, idx) => {
    walk(child, newChildren[idx], ++Index, patches);
  });
  if (newChildren.length > oldChildren.length) {
  }
}

const ATTRS = "ATTRS";
const TEXT = "TEXT";
const REMOVE = "REMOVE";
const REPLACE = "REPLACE";
const INSERT = "INSERT";
let Index = 0;

function walk(oldNode, newNode, index, patches) {
  let currentPach = []; // 每个元素都有一个补丁对象
  if (!newNode) {
    //如果新节点不存在
    currentPach.push({ type: REMOVE, index });
  } else if (isString(oldNode) && isString(newNode)) {
    // 判断文本是否一致
    if (oldNode !== newNode) {
      currentPach.push({ type: TEXT, text: newNode });
    }
  } else if (oldNode.type === newNode.type) {
    // 比较属性是否有更改

    let attrs = diffAttr(oldNode.props, newNode.props);
    if (Object.keys(attrs).length > 0) {
      currentPach.push({ type: ATTRS, attrs });
    }
    // 如果有儿子节点，遍历儿子
    diffChildren(oldNode.children, newNode.children, patches);
  } else {
    debugger;
    //直接替换
    currentPach.push({ type: REPLACE, newNode });
  }
  if (currentPach.length > 0) {
    //当前元素确实有补丁
    // 把元素和补丁对应起来，放到大补丁包中
    patches[index] = currentPach;
  }
}

export default diff;
