/** 采用了宏任务，微任务模拟了对比 */

import React from "react";
import ReactDOM from "react-dom/client";

let hookStates = []; // 保存所有状态的数组
let hookIndex = 0; // 默认 从第一个开始保持状态

function useMemo(factory, dependencies) {
  if (hookStates[hookIndex]) {
    const [oldMemo, oldDependencies] = hookStates[hookIndex];
    // 已经缓存过值了
    let same = dependencies.every((item, index) =>
      Object.is(item, oldDependencies[index])
    );
    if (same) {
      hookIndex++; // 取值下标后移，不然值会错乱
      return oldMemo;
    } else {
      const newMemo = factory();
      hookStates[hookIndex++] = [newMemo, dependencies]; // dependencies 要做对比
      return newMemo;
    }
  } else {
    //没有缓存值
    const newMemo = factory();
    hookStates[hookIndex++] = [newMemo, dependencies]; // dependencies 要做对比
    return newMemo;
  }
}

function useCallback(callBack, dependencies) {
  if (hookStates[hookIndex]) {
    // 已经缓存过值了
    const [lastCallBack, lastDependencies] = hookStates[hookIndex];
    let same = dependencies.every((item, index) =>
      Object.is(item, lastDependencies[index])
    );
    if (same) {
      hookIndex++; // 取值下标后移，不然值会错乱
      return lastCallBack;
    } else {
      hookStates[hookIndex++] = [callBack, dependencies]; // dependencies 要做对比
      return callBack;
    }
  } else {
    //没有缓存值
    hookStates[hookIndex++] = [callBack, dependencies]; // dependencies 要做对比
    return callBack;
  }
}
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

function useState(initialValue) {
  return useReducer(null, initialValue);
}
function useReducer(reducer, initialState) {
  hookStates[hookIndex] = hookStates[hookIndex] || initialState;
  let currentIndex = hookIndex;
  function dispatch(action) {
    hookStates[currentIndex] = reducer
      ? reducer(hookStates[currentIndex], action)
      : action;
    render();
  }
  return [hookStates[hookIndex++], dispatch];
}

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return state + 1;
    default:
      return state; // 用来初始化默认状态的
  }
}

function App() {
  let [state, dispatch] = useReducer(reducer, 0);
  let [num, setNum] = useState(2);
  const handleAdd = () => {
    dispatch({
      type: "add",
    });
    setNum(num + 1);
  };

  return (
    <div>
      {state}
      <div>{num}</div>
      <br />
      <button onClick={handleAdd}> 点击</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

function render() {
  hookIndex = 0; // 保证每次渲染的时候，都是从0开始，进行匹配状态
  root.render(<App />);
}
render();
