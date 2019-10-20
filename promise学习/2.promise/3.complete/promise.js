//实现链式调用

const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

// 有可能then成功之后，别人return了promise
function resolvePromise(promise2, x, resolve, reject) {
  // x 来取决promise2是成功还是失败
  if (x === promise2) {
    throw reject(
      new TypeError("TypeError: ChainingCycle detected for promise #<Promise>")
    );
  }

  //如何判断x 是不是一个promise
  // 判断x是不是一个promise 如果x是一个常量，直接resolve
  let called; //防止多次被调用成功，失败
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    // 有可能是promise
    try {
      let then = x.then;
      if (typeof then === "function") {
        // 这个时候我们认为是promise了
        then.call(
          x,
          y => {
            if (called) return; // 调用成功不能调用失败
            called = true;
            // 递归解析当前x的promise的结果，因为promise成功后可能还是一个promise
            resolvePromise(promise2, y, resolve, reject);
          },
          r => {
            if (called) return; // 调用失败不能调用成功
            called = true;
            reject(r);
          }
        );
      } else {
        resolve(x); //普通值
      }
    } catch (e) {
      if (called) return; // 调用失败不能调用成功
      called = true;
      reject(e);
    }
  } else {
    // 普通的 String number bool
    resolve(x);
  }
}

class Promise {
  constructor(executor) {
    this.state = PENDING;
    this.value = undefined; // 成功值
    this.reason = undefined; //失败值

    this.resolveCallbacks = [];
    this.rejectCallback = [];

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

  // x是当前then成功或者失败函数的返回结果
  // x是不是一个普通值 如果普通值，把值直接传递到下一个then中
  // x 是一个promise ？ 我需要采用这个x的状态
  // 如果执行函数出错，直接调用promise2的失败

  then(onfulfilled, onrejected) {
    onfulfilled =
      typeof onfulfilled === "function" ? onfulfilled : value => value;
    onrejected =
      typeof onrejected === "function"
        ? onrejected
        : err => {
            throw err;
          };
    //因为promose2 还没有new 完，所以构造方法中使用promise2要用下setTimout
    const promise2 = new Promise((resolve, reject) => {
      //此函数会立即执行
      if (this.state === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onfulfilled(this.value);
            // resolve(x);
            // 看x的返回结果，看下x是不是promises2，再去让promise2变成成功或者失败
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }
      if (this.state === REJECTED) {
        setTimeout(() => {
          try {
            let x = onrejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }
      if (this.state === PENDING) {
        this.resolveCallbacks.push(() => {
          // todo...
          setTimeout(() => {
            try {
              let x = onfulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        }); // 不想破坏原来函数 还想扩展的
        this.rejectCallback.push(() => {
          setTimeout(() => {
            try {
              let x = onrejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    });

    return promise2;
  }

  catch(errCallback) {
    return this.then(null, errCallback);
  }
  finally() {
    let P = this.constructor;
    return this.then(
      value => P.resolve(callback()).then(() => value),
      reason =>
        P.resolve(callback()).then(() => {
          throw reason;
        })
    );
  }
}

Promise.prototype.all = function(promises) {
  return new Promise((resolve, reject) => {
    let arr = [];
    let index = 0;
    function processData(i, y) {
      arr[i] = y;
      if (++index === promises.length) {
        resolve(arr);
      }
    }
    for (let i = 0; i < promises.length; i++) {
      let value = promises[i];
      if (isPromise(value)) {
        value.then(
          (y => {
            processData(i, y);
          },
          reject)
        );
      } else {
        processData(i, value);
      }
    }
  });
};
//判断是否是Promise
function isPromise(value) {
  if (
    (typeof value === "object" && typeof value !== null) ||
    typeof value === "function"
  ) {
    if (typeof value.then === "function") {
      return true;
    }
  }
  return false;
}

module.exports = Promise;
