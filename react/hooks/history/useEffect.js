import React, { useState } from "react";
import ReactDOM from "react-dom/client";

let hookStates = []; // 保存所有状态的数组
let hookIndex = 0; // 默认 从第一个开始保持状态

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
      const destory = callBack();
      hookStates[hookIndex++] = [destory, dependencies];
    }
  } else {
    const destory = callBack();
    hookStates[hookIndex++] = [destory, dependencies];
    // 第一次执行 需要把销毁函数缓存起来，下次执行之前，先掉用销毁函数
  }
}

function App() {
  const [num, setNum] = useState(0);
  useEffect(() => {
    let timer = setInterval(() => {
      setNum(num + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <div>{num}</div>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));

function render() {
  hookIndex = 0; // 保证每次渲染的时候，都是从0开始，进行匹配状态
  root.render(<App />);
}
render();
