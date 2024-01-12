const loaderUtils = require('loader-utils');
function loader(source){
  // 我们可以在此导出style 脚本
  let str = `
  let style = document.createElement('style');
  style.innerHTML = ${JSON.stringify(source)}
  document.head.appendChild(style);
  `
  return str
}

// 在style-loader 上写了pitch，后面的css-loader和 less-loader 就不走了
// style-lodaer less-loader!css-loader!./index.less
loader.pitch=function(remainingingRequest){ // 剩余请求
  // console.log(remainingingRequest) // 绝对路径 css-loader.js!less-loader.js!index.less
  let str = `
  let style = document.createElement('style');
  style.innerHTML = require(${loaderUtils.stringifyRequest(this,"!!"+remainingingRequest)});
  document.head.appendChild(style);
  `
  return str

}

module.exports =loader;

// JSON.stringify(source) =》 body {\n  background: red;\n}\n

// JSON.stringify() 保留换行

//loaderUtils.stringifyRequest 绝对路径换相对路径  后面的 !! 行内loader的写法  防止解析文件死循环