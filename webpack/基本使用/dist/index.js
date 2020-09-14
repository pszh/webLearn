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
  "./src/home.js": function (module, exports, __webpack_require__) {
    eval(
      'console.log("12", "3311");\nconst data = __webpack_require__(/*! ./utils/test.js */ "./src/utils/test.js");\n// import("./utils/test.js").then(data => {\n  console.log(data);\n// });\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaG9tZS5qcz83YjQxIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0EsYUFBYSxtQkFBTyxDQUFDLDRDQUFpQjtBQUN0QztBQUNBO0FBQ0EsSUFBSSIsImZpbGUiOiIuL3NyYy9ob21lLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc29sZS5sb2coXCIxMlwiLCBcIjMzMTFcIik7XG5jb25zdCBkYXRhID0gcmVxdWlyZSgnLi91dGlscy90ZXN0LmpzJyk7XG4vLyBpbXBvcnQoXCIuL3V0aWxzL3Rlc3QuanNcIikudGhlbihkYXRhID0+IHtcbiAgY29uc29sZS5sb2coZGF0YSk7XG4vLyB9KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/home.js\n'
    );
  },
  "./src/utils/test.js": function (module, exports) {
    eval(
      'module.exports = "change world";\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvdGVzdC5qcz8wNTJhIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6Ii4vc3JjL3V0aWxzL3Rlc3QuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IFwiY2hhbmdlIHdvcmxkXCI7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/utils/test.js\n'
    );
  },
});
