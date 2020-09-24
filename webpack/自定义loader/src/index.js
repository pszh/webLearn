console.log("自定以loader");
// 行内loader基本使用  执行顺序 loader1  inline-loader  loader2
//require("inline-loader!./a.js");

// 不在通过pre+normal处理  执行顺序inline-loader  loader2
// require("-!inline-loader!./a.js");

// 不在通过 normal 处理  执行顺序inline-loader  loader2
//require("!inline-loader!./a.js");

// 不需要 pre normal post 处理，只有inline-loader
// require("!!inline-loader!./a.js");

// 测试 babe-loader
class Person {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}

// 测试 file-loader 和url-loader
import p from "./70f96d4e9e323a95s.jpg";
const img = document.createElement("img");
img.src = p;
document.body.appendChild(img);
