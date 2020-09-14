(function (modules) {
  // The module cache
  var installedModules = {};

  // The require function
  function __webpack_require__(moduleId) {
    // Check if module is in cache
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // Create a new module (and put it into the cache)
    var module = (installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {},
    });

    modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    );

    module.l = true;
    return module.exports;
  }

  // Load entry module and return exports
  return __webpack_require__((__webpack_require__.s = "./src/home.js"));
})({
  
    "./src/home.js":
    function (module, exports, __webpack_require__) {
      eval(`const name = __webpack_require__("./src/name.js");

console.log("name:", name);

__webpack_require__("./src/index.less");`);
    },
  
    "./src/name.js":
    function (module, exports, __webpack_require__) {
      eval(`const name = "lalala";
module.exports = name;`);
    },
  
    "./src/index.less":
    function (module, exports, __webpack_require__) {
      eval(`let style = document.createElement('style');
style.innerHTML = "body {\\n  background-color: burlywood;\\n}\\n";
document.head.appendChild(style);`);
    },
  
  
});
