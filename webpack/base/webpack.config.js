// webpack 为node写法
let path = require("path");
module.exports = {
  mode: "development",
  entry: "./src/index.js", //入口
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "output.js"
  }
};
