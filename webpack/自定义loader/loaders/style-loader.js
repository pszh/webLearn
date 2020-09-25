function loader(source){
  // 我们可以在此导出style 脚本
  let str = `
  let style = document.createElement('style');
  style.innerHTML = ${JSON.stringify(source)}
  document.head.appendChild(style);
  `
  return str
}
module.exports =loader;

// JSON.stringify(source) =》 body {\n  background: red;\n}\n