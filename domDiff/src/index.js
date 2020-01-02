import { createElement, render, renderDom } from "./element";

let vertualDom = createElement("ul", { class: "list" }, [
  createElement("li", { class: "item" }, ["a"]),
  createElement("li", { class: "item" }, ["b"]),
  createElement("li", { class: "item" }, ["c"])
]);

renderDom(render(vertualDom), window.root);

console.log(vertualDom);
console.log(render(vertualDom));
