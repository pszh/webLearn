 const less = require('less');
function loader(source){
  console.log(11);
  let css;
  less.render(source,(err,r)=>{
    css = r.css;
  })
  return css
}
module.exports =loader;
