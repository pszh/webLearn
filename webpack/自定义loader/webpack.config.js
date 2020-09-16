const path = require("path");
module.exports = {
  mode: "development",
  entry: "./src/index.js",

  output: {
    filename: "build.js",
    path: path.resolve(__dirname, "dist")
  },
  resolveLoader: {
    modules: ["node_modules", path.resolve(__dirname, "loaders")] // 第三种 先去node_modules中查找，然后去当前loaders文件夹下
    // 别名
    // alias: {
    //   loader1: path.resolve(__dirname, "loaders", "loader1") // 引入自定义loader第二种方式
    // }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          // path.resolve(__dirname, "loaders", "loader1") // 引入自定义loader第一种方式
          "loader1" // 引入自定义loader第二,三种方式
        ]
      }
    ]
  },
  plugins: []
};
