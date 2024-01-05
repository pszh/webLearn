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

function Counter() {
  let [num, setNum] = useState(0);
  let [num2, setNum2] = useState(0); // 多个需要一个序列
  return (
    <>
      <div>
        {num}
        <button
          onClick={() => {
            setNum(num + 1);
          }}
        >
          增加
        </button>
      </div>
      <hr></hr>
      <div>
        {num2}
        <button
          onClick={() => {
            setNum2(num2 + 2);
          }}
        >
          增加
        </button>
      </div>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
function render() {
  hookIndex = 0; // 保证每次渲染的时候，都是从0开始，进行匹配状态
  root.render(
    <h1>
      hello
      <Counter />
    </h1>
  );
}
render();
