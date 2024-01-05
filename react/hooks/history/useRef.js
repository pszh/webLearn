import React from "react";
import ReactDOM from "react-dom/client";

let hookStates = []; // 保存所有状态的数组
let hookIndex = 0; // 默认 从第一个开始保持状态

function useRef(initialValue) {
  hookStates[hookIndex] = hookStates[hookIndex] || { current: initialValue };
  return hookStates[hookIndex++];
}
function App() {
  const aa = useRef(12);
  console.log(aa);
  return <div ref={aa}>11</div>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));

function render() {
  hookIndex = 0; // 保证每次渲染的时候，都是从0开始，进行匹配状态
  root.render(<App />);
}
render();
