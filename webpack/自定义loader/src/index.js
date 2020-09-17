console.log("自定以loader");
// 行内loader基本使用  执行顺序 loader1  inline-loader  loader2
//require("inline-loader!./a.js");

// 不在通过pre+normal处理  执行顺序inline-loader  loader2
// require("-!inline-loader!./a.js");

// 不在通过 normal 处理  执行顺序inline-loader  loader2
//require("!inline-loader!./a.js");

// 不需要 pre normal post 处理，只有inline-loader
// require("!!inline-loader!./a.js");

class Person {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}
