class FileListPlugin{
  constructor({fileName}){
    this.fileName = fileName;
  }
  apply(compiler){
    compiler.hooks.emit.tapAsync('FileListPlugin',(compilation,cb)=>{
      let assets = compilation.assets;
      console.log(assets);
      let content = '文件资源    文件大小 \r\n';
      Object.entries(assets).forEach(([filename,stateObj])=>{
        content +=  `${filename}    ${stateObj.size()}\r\n`;
      });
      console.log(this.fileName,content);
      assets[this.fileName]={
        source(){
          return content;
        },
        size(){
          return content.length;
        }
      }
      cb();
    });
  }
}
module.exports =FileListPlugin;
