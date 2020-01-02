import { createElement, render, renderDom } from "./element";
import diff from "./diff";

let vertualDom = createElement("ul", { class: "list" }, [
  createElement("li", { class: "item" }, ["a"]),
  createElement("li", { class: "item" }, ["b"]),
  createElement("li", { class: "item" }, ["c"])
]);

let newVertualDom = createElement("ul", { class: "list-group" }, [
  createElement("li", { class: "item" }, ["1"]),
  createElement("li", { class: "item" }, ["b"]),
  createElement("div", { class: "item" }, ["3"])
]);

renderDom(render(vertualDom), window.root);
let patchs = diff(vertualDom, newVertualDom);
console.log(patches);
//把虚拟dom的改动转化到真实dom上
