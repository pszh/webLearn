const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class Promise {
  constructor(executor) {
    //executor 立即执行
    this.state = PENDING;
    this.value = undefined; // 成功值
    this.reason = undefined; //失败值

    this.resolveCallbacks = []; // 存放所有then中成功回调用
    this.rejectCallback = []; // 存放所有then中失败回调用

    let resolve = value => {
      //每一个promose 有自己的方法，所以和then位置不一样
      if (this.state === PENDING) {
        //只有pengding才可以改变，这样改变之后就不可以改变了
        this.state = FULFILLED;
        this.value = value;
        this.resolveCallbacks.forEach(fn => fn()); // 有异步逻辑的话，让数组中的订阅成功回调执行
      }
    };
    let reject = reason => {
      if (this.state === PENDING) {
        //同上
        this.state = REJECTED;
        this.reason = reason;
        this.rejectCallback.forEach(fn => fn()); // 有异步逻辑的话，让数组中的订阅失败回调执行
      }
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onfulfilled, onrejected) {
    if (this.state === FULFILLED) {
      return onfulfilled(this.value);
    }
    if (this.state === REJECTED) {
      return onrejected(this.reason);
    }
    if (this.state === PENDING) {
      // executor 有异步的操作 then调用的时候还没有 完成，所以需要发布订阅了

      //订阅成功的回调和失败的回调
      this.resolveCallbacks.push(() => {
        // todo...
        onfulfilled(this.value);
      }); // 不想破坏原来函数 还想扩展的
      this.rejectCallback.push(() => {
        //todo...
        onrejected(this.reason);
      });
    }
  }
}

module.exports = Promise;
