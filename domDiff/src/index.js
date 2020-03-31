import { createElement, render, renderDom } from "./element";
import diff from "./diff";
import patch from "./patch";

let vertualDom = createElement("ul", { class: "list" }, [
  createElement("li", { class: "item" }, ["a"]),
  createElement("li", { class: "item" }, ["b"])
]);

let newVertualDom = createElement("ul", { class: "list-group" }, [
  createElement("li", { class: "item" }, ["a"]),
  createElement("li", { class: "item" }, ["b"]),
  createElement("div", { class: "item" }, ["3"])
]);

const node = render(vertualDom);

renderDom(node, window.root);

let patchs = diff(vertualDom, newVertualDom);
console.log(patchs);

//把虚拟dom的改动转化到真实dom上
patch(node, patchs);
