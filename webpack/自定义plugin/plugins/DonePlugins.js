class DonePlugins {
  apply(compiler){ // compiler.hooks
    compiler.hooks.done.tap('DonePlugins',(stats)=>{
      console.log('编译完成');
    });

  }
}
module.exports = DonePlugins;
