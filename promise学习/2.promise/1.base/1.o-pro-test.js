//调用了resolve 就是成功态
//调用reject 就是失败态
// 如果内部抛错，变成失败态

//返回一个promise的实例，每个实例都有一个then方法

// executor 是立即执行的

const Promise = require("./promise");
let p = new Promise((resolve, reject) => {
  console.log(1);
  // throw new Error('失败');
  resolve("发财了");
  reject("失败");
  console.log("ll"); // 抛错不执行,其他都是执行的  所以一般 return resolve() 或者return reject()
});
console.log(2);

p.then(
  data => {
    console.log("成功 :", data);
  },
  reason => {
    console.log("失败 :", reason);
  }
);
