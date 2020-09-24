const loaderUtils = require("loader-utils");
function loader(source) {
  let filename = loaderUtils.interpolateName(this, `[hash].[test]`, {
    content: source
  });
  this.emitFile(filename, source); // 发射文件

  return `module.exports="${filename}"`;
}

loader.raw = true; // 获取source 的二进制模式
module.exports = loader;
