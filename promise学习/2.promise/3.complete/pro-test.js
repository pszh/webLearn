const fs = require("fs");

function read(filename, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, encoding, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

// 1) 如果then成功失败的结果中，返回的还是promose，会等待这个promise 的执行结果，
//  并将结果向下一层的then传递
// 2) 如果then(成功方法，失败方法) 抛出异常的时候
// 走失败的有两种情况 1）返回一个失败的promise 2）抛出异常

// 3) 如果希望 走完失败后，就终止promise

read("../../name.text", "utf8")
  .then(
    data => {
      return read(data, "utf8");
    },
    err => {
      console.log("第一层", err);
      // 如果走的是这边 ，会走下一层的resolve(undefind)
      // 如果要走下一层的reject; 用 throw err
      // return new Promise(()=>{});// 返回一个不成功也不失败的promose，就终止了链式调用
    }
  )
  .then(
    data => {
      console.log("上一层结果", data);
    },
    err => {
      console.log("第二层", err);
    }
  );

// 如何实现链式调用，
//1 ）第一种返回 this，（不过promise状态确定了就不能改变，所以不行）
//2） 第二种返回一个 新实例
