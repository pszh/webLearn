class TestPlugins {
  apply(compile) {
    console.log("start");
    compile.hooks.emit.tap("emit", () => {
      console.log("emit");
    });
  }
}

module.exports = TestPlugins;
