// 函数柯里化  需要把核心功能提取出一个更小的函数


//反柯里化 让函数的方法更通用一些

//交验类型
// 1） typeOf 不能交验对象 数组 object null
// 2) instanceof 谁是谁的实例
// 3） Object.prototype.toString. call 不能判断实例子 【object object】
// 4） constructor 判断当前是谁构造出来的  eg:console.log(({}).construcor)


/**最初版本 */
// 普通函数， 每次都要传递参数，可以使用高阶函数 来绑定参数
function checkType(value,type){
    return Object.prototype.toString.call(value) === `[object ${type}]`
}

console.log(checkType('1ng', 'String'));


/**柯里化 */
function checkType(type){ 
    return (value)=>{
        return Object.prototype.toString.call(value) === `[object ${type}]`;
    }
}

let isString = checkType('String');
console.log(isString('hello2'));
console.log(isString('hello'));

let isNumber = checkType('Number');
console.log(isNumber(1212));
