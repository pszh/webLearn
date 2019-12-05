// webpack 为node写法
let path = require("path");

let HtmlWebpacklugin = require("html-webpack-plugin");
module.exports = {
  devServer: {
    // 开发服务器的配置
    port: 3000,
    progress: true,
    contentBase: "./build"
  },
  mode: "development",
  entry: "./src/index.js", //入口
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "output.js" //使用hash值  "output[hash:8].js"
  },
  module: {
    //  模块
    rules: [
      //规则 css-loader 接续 @import这种语法
      // style-loader 把css插入到head的标签中
      //loader 特点: 功能单一； 用法 ：一个loader用字符串，多个[]；顺序：默认从右往左
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader", options: { insertAt: "top" } }, //传对象这样写， inserAt css插入的位置
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    //数组，存放着所有的webpack插件
    new HtmlWebpacklugin({
      template: "./src/index.html",
      filename: "index.html", //输出后的文件名
      minify: {
        // 在 mode:'production', 时候压缩html配置
        removeAttributeQuotes: true, //双引号
        collapseWhitespace: true //压缩成一行
      }
    })
  ]
};
