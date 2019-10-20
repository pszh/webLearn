// 如何实现柯里化的通用函数
function curring(fn, arr =[]){ // 函数的参数可以通过length 来获取个数
    return (...args) =>{
       arr = [...arr, ...args];
        if( arr.length < fn.length ){
            return curring(fn,arr)
        }else{
            return fn(...arr)
        }
    }
}

function checkType(type,value){ 
    return Object.prototype.toString.call(value) === `[object ${type}]`;
}

let isString = curring(checkType)('String');

console.log(isString('hello'));

let util = {}
let types = ['String', 'Number', 'Boolean', 'Null', 'Undefind'];
types.forEach(item =>{
    util[`is${item}`] = curring(checkType)(item);
})
console.log(util.isString('hello'));



function add(a,b,c,d,e){
    return a + b + c + d + e;
}
curring(add)(1)(2,3)(4,5);

