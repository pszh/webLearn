// webpack 为node写法
let path = require("path");

let HtmlWebpacklugin = require("html-webpack-plugin");
let miniCssExtractPlugiin = require("mini-css-extract-plugin");
let optimizeCss = require("optimize-css-assets-webpack-plugin");
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
    filename: "output[hash:8].js" //使用hash值  "output[hash:8].js"
    // publicPath: "http://www.pszh.com" //给打包后的js,css,image图片都加上cdn路径 mode:"production"，其他不要加
  },
  module: {
    //  模块
    rules: [
      {
        test: /\.html$/,
        use: "html-withimg-loader"
      },
      {
        test: /\.(png|jpg|gif)$/,
        // 做一个限制，图片小于 多少k时候，用base64来转化
        // 否则用file-loader产生真实图片
        use: {
          loader: "url-loader",
          options: {
            limit: 10 * 1024,
            outputPath: "img/" //打包路径
          }
        }
      },
      //规则 css-loader 接续 @import这种语法
      // style-loader 把css插入到head的标签中
      //loader 特点: 功能单一； 用法 ：一个loader用字符串，多个[]；顺序：默认从右往左
      {
        test: /\.css$/,
        use: [miniCssExtractPlugiin.loader, "css-loader", "postcss-loader"]
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            // 用babel-loader 把es6-es5
            presets: ["@babel/preset-env"]
          }
        },
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    //数组，存放着所有的webpack插件
    new HtmlWebpacklugin({
      template: "./src/index.html",
      filename: "index.html" //输出后的文件名
      //minify: { // 和 html-withimg-loader会冲突，所以注释
      // 在 mode:'production', 时候压缩html配置
      // removeAttributeQuotes: true, //双引号
      // collapseWhitespace: true //压缩成一行
      //}
    }),
    new miniCssExtractPlugiin({
      filename: "main.css" // "css/main.css" 打包分路径，mode:"production"加
    }),
    new optimizeCss({})
  ]
};
