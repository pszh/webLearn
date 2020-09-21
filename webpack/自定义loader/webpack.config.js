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

  devtool: "source-map",
  watch: true,
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: [
      //     // path.resolve(__dirname, "loaders", "loader1") // 引入自定义loader第一种方式
      //     "loader1" // 引入自定义loader第二,三种方式
      //   ]
      // },
      // {
      //   test: /\.js$/,
      //   use: { loader: "loader2" },
      //   enforce: "post"
      // },
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: "babel-loader",
      //     options: { presets: ["@babel/preset-env"] }
      //   }
      // }
      {
        test: /\.js$/,
        use: {
          loader: "banner-loader",
          options: {
            text: "pszh",
            filename: path.resolve(__dirname, "src/banner.js")
          }
        }
      }
    ]
  },
  plugins: []
};
