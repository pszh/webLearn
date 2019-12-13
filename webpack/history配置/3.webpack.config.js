/**source-map*/
const path = require("path");
let htmlwebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "productions",
  entry: {
    home: "./src/home.js"
  },
  output: {
    //[name]表示变量 home ,other. entry的key值
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },

  plugins: [
    new htmlwebpackPlugin({
      template: "./src/index.html",
      filename: "home.html"
    })
  ]
};
