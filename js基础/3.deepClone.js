/**实现一个深度拷贝 */
function deepClone(obj, hash = new WeakMap()) {
  // null undefined
  if (obj === null) return obj;

  // 特殊类型
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);

  // 基础类型的话
  if (typeof obj !== Object) return obj;

  //正常对象的话
  // 防止 a.o = a ;这种的死循环
  if (hash.get(obj)) return hash.get(obj);

  let cloneObj = new obj.constructor(); //直接使用了对象的构造方法
  hash.set(obj, cloneObj);
  for (key in obj) {
    cloneObj.key = deepClone(obj[key]);
  }
}

const a = new Date("2018");
console.log(a);
console.log(deepClone(a));

// ... 浅拷贝
const person = { age: 121, children: { sex: 1 } };
const clonePerson = { ...person };
person.age = 11;
person.children.sex = 2;
console.log(person); //{ age: 11, children: { sex: 2 } }
console.log(clonePerson); //{ age: 121, children: { sex: 2 } }
