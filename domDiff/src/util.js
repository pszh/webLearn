/**设置属性 */
function setAttr(node, key, value) {
  switch (key) {
    case "value":
      if (
        node.tagName.toUpperCase() === "INPUT" ||
        node.tagName.toUpperCase() === "TEXTAREA"
      ) {
        node.value = value;
      } else {
        node.setAttribute(key, value);
      }
      break;
    case "style":
      node.style.cssText = value;
      break;
    default:
      node.setAttribute(key, value);
      break;
  }
}

/**是否是字符串 */
function isString(node) {
  return Object.prototype.toString.call(node) === "[object String]";
}

export { setAttr, isString };
