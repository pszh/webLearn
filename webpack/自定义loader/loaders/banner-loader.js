const loaderUtils = require("loader-utils");
const valiateOPtions = require("schema-utils");
const fs = require("fs");
/** 1.给源码添加注释， 有filename 先读filenamew文件
 *  2. 开缓存，
 *  3. 配合webpack.config中的watch监听
 */
function loader(source) {
  this.cacheable(false); // 是否开启缓存
  const options = loaderUtils.getOptions(this);
  const cb = this.async();
  let schema = {
    type: "object",
    properties: {
      text: {
        type: "string"
      },
      filename: {
        type: "string"
      }
    }
  };

  valiateOPtions(schema, options, "banner-loader");
  if (options.filename) {
    console.log(options.filename);
    this.addDependency(options.filename); // 和 webpack.config.js 中的watch: true配合使用
    fs.readFile(options.filename, "utf8", (err, data) => {
      console.log(data);
      cb(err, `/**${data}**/${source}`);
    });
  } else {
    cb(null, `/**${options.text}**/${source}`);
  }

  return source;
}
module.exports = loader;
