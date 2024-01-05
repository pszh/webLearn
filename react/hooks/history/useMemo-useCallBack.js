import React from "react";
import ReactDOM from "react-dom/client";

let hookStates = []; // 保存所有状态的数组
let hookIndex = 0; // 默认 从第一个开始保持状态

function useState(initialValue) {
  hookStates[hookIndex] = hookStates[hookIndex] || initialValue; // 保持过的去上一次的，否则去默认状态
  const curIndex = hookIndex; // return 的时候hookIndex 自增了，存储下一个hook
  function setState(newState) {
    hookStates[curIndex] = newState;
    render();
  }
  return [hookStates[hookIndex++], setState];
}

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

function Children({ data, onBtnClick }) {
  console.log("Render");
  return (
    <>
      {data.age}
      <button onClick={onBtnClick}>年龄+1</button>
    </>
  );
}
let MemoChildren = React.memo(Children);

function App() {
  const [name, setName] = useState("jianng");
  const [age, setAge] = useState(13);
  const data = useMemo(() => ({ age }), [age]);
  const addClick = useCallback(() => {
    setAge(age + 1);
  }, [age]);
  return (
    <>
      {name}
      <input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <br />
      <MemoChildren data={data} onBtnClick={addClick} />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

function render() {
  hookIndex = 0; // 保证每次渲染的时候，都是从0开始，进行匹配状态
  root.render(<App />);
}
render();
