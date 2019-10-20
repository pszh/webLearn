//处理异步解决方案 
let fs = require('fs');


let user ={};
// node 异步i/o
fs.readFile('./name.text','utf8',function(err,data){
    user.name = data;
    out();
});

fs.readFile('./age.text','utf8',function(err,data){
    user.age = data;
    out();
})

/**保证两个文件都读完在输出 */
// // 计数器方式
// let index = 0;
// function out (){
//     index ++;
//     if(index === 2){
//         console.log(user);
//     }
// }


let out = after(2, ()=>{ // 把数量内置到after函数中， 必包  Promise.all
    console.log(user);
});

function after (times, callback){  // 高阶函数
    return ()=>{
        if(--times ===0){
            callback();
        }
    }
}