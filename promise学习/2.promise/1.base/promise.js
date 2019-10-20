const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class Promise {
  constructor(executor) {
    //executor 立即执行
    this.state = PENDING;
    this.value = undefined; // 成功值
    this.reason = undefined; //失败值

    let resolve = value => {
      //每一个promose 有自己的方法，所以和then位置不一样
      if (this.state === PENDING) {
        //只有pengding才可以改变，这样改变之后就不可以改变了
        this.state = FULFILLED;
        this.value = value;
      }
    };
    let reject = reason => {
      if (this.state === PENDING) {
        //同上
        this.state = REJECTED;
        this.reason = reason;
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
  }
}

module.exports = Promise;
