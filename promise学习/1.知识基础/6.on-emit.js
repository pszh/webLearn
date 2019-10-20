//视频时间 上午 1:10:40
//发布订阅模式   eg： vue 的eventBus
//好处 解耦
let fs = require('fs');
let user ={};

let event = {
    arr:[],
    on(fn){
        this.arr.push(fn); 
    },
    emit(){
        this.arr.forEach(fn=>fn()); //发布
    }
}


// 挂载
event.on(function(){
    //订阅
    if(Object.keys(user).length ===2){
        console.log(user);
    }
});
// 你可以挂载多次，他就执行多次
// event.on(function(){
//     //订阅
//    console.log('执行了');
// });


// node 异步i/o
fs.readFile('./name.text','utf8',function(err,data){
    user.name = data;
    event.emit();// 发布
});

fs.readFile('./age.text','utf8',function(err,data){
    user.age = data;
    event.emit(); // 发布
})
