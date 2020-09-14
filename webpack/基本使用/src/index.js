// webpack 打包图片
// 1)在js中创建图片
import image from "./image.jpg"; //引入图片，返回一个新地址 （file-loader）为了可以根据大小编译base64 所以用url-loader
let img = new Image();
img.src = image;
document.body.appendChild(img);
// 2）在css引入background（'url'） // css-loader回操作

// 3) <img src="" /img> html-withimg-loader

import style from "./a.css";

const a = () => {
  console.log("helloWrod");
};
a();
