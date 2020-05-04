const newObj = (func, ...arg) => {
  const oC = Object.create(func.prototype);

  // 使用apply在obj作用域中调用构造器函数，属性和方法被添加到 this 引用的对象即obj中
  const backObj = func.apply(oC, arg);

  if (typeof backObj === "object" || typeof backObj === "function") {
    // 如果构造函数执行的结果返回的是一个对象，那么返回这个对象 Person 中返回this
    return backObj;
  }

  return oC;
};

function Person(name, age) {
  this.name = name;
  this.age = age;
  return this;
}

console.log(newObj(Person, "名字", 21));
console.log(newObj(Number, 111)); //会有问题  typeof backObj === "object" || typeof backObj === "function" 应该要加上 string，
