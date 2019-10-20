// 有了 异步操作
const Promise = require("./promise");

let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    // throw new Error('失败');
    resolve("发财了");
    reject("失败");
  }, 1000);
});

p.then(
  data => {
    console.log("成功 :", data);
  },
  reason => {
    console.log("失败 :", reason);
  }
);
