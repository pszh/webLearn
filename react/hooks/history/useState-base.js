import React from "react";
import ReactDOM from "react-dom/client";

let lastState; //记录上一次的状态
function useState(initialValue) {
  lastState = lastState || initialValue; // 保持过的去上一次的，否则去默认状态
  function setState(newState) {
    lastState = newState;
    render();
  }
  return [lastState, setState];
}

function Counter() {
  let [num, setNum] = useState(0);
  return (
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
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
function render() {
  root.render(
    <h1>
      hello
      <Counter />
    </h1>
  );
}
render();
