const bable = require("@babel/core");
const loaderUtils = require("loader-utils");

function loader(source) {
  // console.log(Object.keys(this));
  let options = loaderUtils.getOptions(this);
  const cb = this.async();
  bable.transform(
    source,
    {
      ...options,
      sourceMap: true, // 源码映射，webpack配置中也要加
      filename: this.resourcePath.split("/").pop() // 源码映射的源码文件 文件名
    },
    function(err, result) {
      // 异步回调
      cb(err, result.code, result.map);
    }
  );
}

module.exports = loader;
