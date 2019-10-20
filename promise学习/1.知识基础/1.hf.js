//异步编程 高阶函数
//高阶函数 1）你可以把函数当做另一个函数的参数传入， 2）如果一个函数， 返回一个新的函数，那么这个函数也是高阶函数

Function.prototype.before = function (cb){

    //箭头函数没有this指向 this向上一级查找 
    // ... 剩余运算符 
    return (...args)=>{
        cb();
        this(...args); 
    }

    // //或者
    // var self = this;
    // return function (){
    //     cb();
    //     self.apply(null,arguments); 
    // }
}

function makeCoffer(who){
    console.log('创建一杯咖啡' +who);
}

const newCoffer = makeCoffer.before(()=>{
    console.log('加糖')
})

const newCoffer1 = makeCoffer.before(()=>{
    console.log('加奶')
})

newCoffer('老板1');
newCoffer1('员工')
