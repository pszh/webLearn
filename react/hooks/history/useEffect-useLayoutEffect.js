/** 采用了宏任务，微任务模拟了对比 */

import React from "react";
import ReactDOM from "react-dom/client";

let hookStates = []; // 保存所有状态的数组
let hookIndex = 0; // 默认 从第一个开始保持状态

function useRef(initialValue) {
  hookStates[hookIndex] = hookStates[hookIndex] || { current: initialValue };
  return hookStates[hookIndex++];
}

function useEffect(callBack, dependencies) {
  if (hookStates[hookIndex]) {
    // 已经缓存过值了
    const [lastDestory, lastDependencies] = hookStates[hookIndex];
    let same = false;
    if (lastDependencies) {
      same = dependencies.every((item, index) =>
        Object.is(item, lastDependencies[index])
      );
    }
    if (same) {
      hookIndex++; // 取值下标后移，不然值会错乱
    } else {
      lastDestory && lastDestory(); // 如果需要销毁， 则调用上一次的销毁
      let arr = [, dependencies];
      setTimeout(() => {
        arr[0] = callBack();
      });
      hookStates[hookIndex++] = arr;
    }
  } else {
    let arr = [, dependencies];
    setTimeout(() => {
      arr[0] = callBack();
    });
    hookStates[hookIndex++] = arr;
    // 第一次执行 需要把销毁函数缓存起来，下次执行之前，先掉用销毁函数
  }
}

function useLayoutEffect(callBack, dependencies) {
  if (hookStates[hookIndex]) {
    // 已经缓存过值了
    const [lastDestory, lastDependencies] = hookStates[hookIndex];
    let same = false;
    if (lastDependencies) {
      same = dependencies.every((item, index) =>
        Object.is(item, lastDependencies[index])
      );
    }
    if (same) {
      hookIndex++; // 取值下标后移，不然值会错乱
    } else {
      lastDestory && lastDestory(); // 如果需要销毁， 则调用上一次的销毁
      let arr = [, dependencies];
      queueMicrotask(() => {
        arr[0] = callBack();
      });
      hookStates[hookIndex++] = arr;
    }
  } else {
    let arr = [, dependencies];
    queueMicrotask(() => {
      arr[0] = callBack();
    });
    hookStates[hookIndex++] = arr;
    // 第一次执行 需要把销毁函数缓存起来，下次执行之前，先掉用销毁函数
  }
}

function App() {
  const div1 = useRef();
  const div2 = useRef();
  useEffect(() => {
    div1.current.style.transform = "translate(300px)";
    div1.current.style.transition = "all .3s";
  }, []);
  useLayoutEffect(() => {
    div2.current.style.transform = "translate(300px)";
    div2.current.style.transition = "all .3s";
  }, []);

  return (
    <div>
      <div ref={div1} style={{ width: 100, height: 100, background: "red" }} />
      <div ref={div2} style={{ width: 100, height: 100, background: "blue" }} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

function render() {
  hookIndex = 0; // 保证每次渲染的时候，都是从0开始，进行匹配状态
  root.render(<App />);
}
render();
