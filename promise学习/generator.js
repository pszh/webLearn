//promise2下午2 2:18:00
//generator 是生成器
// koa1.0用的就是generator => async + await
// redux-saga dava (generator)

function* read() {
  // generator 生成的是迭代器
  try {
    let a = yield "nodejs"; // 产出
    console.log("a", a);
    let b = yield "react"; // 产出
    console.log("b", b);
  } catch (err) {
    console.log(err);
  }
}

// 迭代器
let it = read();
//抛错
// if (it.next().value === "nodejs") {
//   it.throw("错误");
// }
it.next(); //第一次穿参数无意义
console.log(it.next("a1")); //之后的next的参数回座位上一次的yiled的返回值

console.log(it.next("b1"));

// console.log(it.next());

const fs = require("fs").promises;
//es7 语法async +await 其实就是 generator + co库
async function read() {
  // async 执行结果是promise
  let filename = await fs.readFile("./name.text", "utf-8");
  let age = await fs.readFile(`./${filename}`, "utf-8");
}

read().then(
  data => {
    console.log(data);
  },
  err => {
    console.log(err);
  }
);

//generator 调用generator

function* a() {
  yield 1;
  yield 2;
}

function* b() {
  yield* a(); //generator 调用generator
  yield 3;
  yield 4;
}

const it = b();
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
