class AsyncPlugin {
  apply(compiler){
    compiler.hooks.emit.tapAsync('AsyncPlugin',(compilation,cb)=>{
      setTimeout(() => {
        console.log('文件发射出来，一秒之后');
        cb();
      }, 1000);
    });

    // compiler.hooks.emit.tapPromise('AsyncPlugin',(compilation)=>{
    //   return new Promise((res,rej)=>{
    //     setTimeout(()=>{
    //       console.log('在等一秒之后');
    //       res();
    //     },1000)
    //   })
    // })
  }
}
module.exports = AsyncPlugin;
