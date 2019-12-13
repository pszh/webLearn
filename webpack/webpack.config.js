/**
 * 1. 配置 开发源码映射 sourcemap
 *
 * 2. watch
 * 3.清空dist， clean-webpack-plugin ，复制文件 copy-webpack-plugin
 * 4.代理proxy
 *
 * */
const path = require("path");
let htmlwebpackPlugin = require("html-webpack-plugin");
let { CleanWebpackPlugin } = require("clean-webpack-plugin");
let copyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
  mode: "development",
  entry: {
    index: "./src/home.js"
  },
  devServer: {
    // 开发服务器的配置
    port: 3000,
    progress: true,
    contentBase: "./build"

    // 3)通过在express node服务上直接启动webpack, 端口用的就是webpack的端口  express的中间件  webpack-dev-middleware

    // //2） mock数据的 webpack-server-dev就是一个express服务，所以
    // before(app) {
    //   app.get("/user", (req, res) => {
    //     res.json({ name: "change All" });
    //   });
    // }
    // 1）
    // proxy: {
    //   '/api': {
    //     target: "http://localhost:3000", // 遇到 ‘/api’的代理到这个host上
    //     pathRewrite: { "/api": "" } //重写，把请求路径中的/api=> ''
    //   }
    // }
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },

  //1)源码映射， 单独生成一个.map文件，出错会定位到报错的行和列   文件大且全
  //devtool: "source-map",
  // 2) 不会生产单独文件，可以显示行和列
  devtool: "eval-source-map",
  //3) 不会产生列，但是是一个单独映射文件
  // devtool: "cheap-module-source-map", //产生后保留起来
  // // 4) 不会生成文件， 继承后可以在文件中，不会产生列
  // devtool: "cheap-module-eval-source-map",

  watch: true,
  watchOptions: {
    poll: 1000, // 每秒检测多少次改变
    aggregateTimeout: 500, // 防抖 毫秒之后在执行
    ignored: /node_modules/ //忽略文件
  },

  plugins: [
    new CleanWebpackPlugin(),
    new htmlwebpackPlugin({
      template: "./src/index.html",
      filename: "index.html"
    }),
    new copyWebpackPlugin([{ from: "./public", to: "./" }]) //把public目录中的文件copy到dist下，
    // new copyWebpackPlugin([{ from: "./public", to: "./public" }]) //把public目录中的文件copy到dist下的public文件夹下，
  ]
};
