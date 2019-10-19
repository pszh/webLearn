// https://www.cnblogs.com/yuqingfamily/p/6891512.html

// 对象存在原型链 __proto__ (指向他的构造方法的原型 如：a.__proto__ ===Anim.prototype )
// 方法存在原型 prototype

function Anim() {}
const a = new Anim();
console.log(
  a.__proto__ === Anim.prototype,

  Anim.prototype.constructor === Anim,

  Anim.prototype.__proto__ === Object.prototype,

  Anim.__proto__ === Function.prototype,

  Anim.__proto__.constructor === Function
);

console.log(a.prototype); //undefind 普通对象是没有原型的
console.log(new a.constructor());
//
// 　Function.prototype = {
//   constructor : Function,
//   __proto__ : parent prototype,
//
// };

console.log(Function.prototype.constructor);
console.log(Function.prototype.__proto__ === Object.prototype);

console.log("=====特殊的=====");

console.log("内部指定的", Function.__proto__ === Function.prototype);
console.log(Object.__proto__ === Function.prototype);
console.log(Object.__proto__ === Function.__proto__);

console.log(Anim.constructor === Function);
