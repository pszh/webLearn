//3.0响应式原理  珠峰前端/vue3.0

/** 工具类 start */
/*** 是否是对象 */
function isObject(val) {
  return typeof val === "object" && val !== null;
}
/** 工具类 end */

//防止源对象的多次代理
const toProxy = new WeakMap(); //放的是源对象：代理过的对象
//防止代理对象的多次代理
const toRaw = new WeakMap(); //放的是代理过的对象： 源对象

/** 创建响应式核心方法 */
function reactive(traget) {
  //返回响应式对象
  return createReactiveObject(traget);
}

/** 创建响应式对象 */
function createReactiveObject(traget) {
  if (!isObject) {
    //不是对象直接返回
    return traget;
  }
  let proxy = toProxy.get(traget);
  if (proxy) {
    //如果代理过了就返回代理过的值
    return proxy;
  }

  if (toRaw.has(traget)) {
    //防止代理过的对象再次被代理
    return traget;
  }

  const handler = {
    // Reflect 优点：不会报错 ，操作都有返回值，可以看 Symbol属性值， 之后代替Object方法的
    get: (traget, key, receiver) => {
      // return traget[key];  本来这么写就OK了,对象套对象拿到的是代理对象，所以 这里用了 Proxy + Reflect 反射
      const result = Reflect.get(traget, key, receiver);
      //收集依赖  把key 和effect对应起来
      track(traget, key); // 如果key变化，让数组中effect重新执行
      return isObject(result) ? reactive(result) : result; //取值的时候才递归，不是2.x一上来就递归
    },

    set: (traget, key, value, receiver) => {
      // traget[key] = value; 设置是否成功不知道，而且数组push会报错，所以不用
      //如何识别  改属性，还是新增属性
      const ownkeys = Reflect.ownKeys(traget); //判断以前有没有这个属性
      const oldValue = traget[key];
      const res = Reflect.set(traget, key, value, receiver);
      if (!ownkeys.includes(key)) {
        // 新属性
        trigger(traget, "add", key);
      } else if (oldValue !== value) {
        // 属性值更改过了
        trigger(traget, "set", key);
      } //为了屏蔽无意义的修改

      return res;
    },
    deleteProperty: (traget, key) => {
      const res = Reflect.deleteProperty(traget, key);
      return res;
    }
  };

  let observed = new Proxy(traget, handler); //es6

  //防止多次代理
  toRaw.set(observed, traget);
  toProxy.set(traget, observed);
  return observed;
}

//存放effect函数 只是一个缓冲的，js单线程 里面只会有一个 vue.effect的 effect
const activeEffectStacks = []; //栈型结构
//上面存的值类型
// {
//   traget:{
//     key:set类型 存的 effect ,//多个effect是因为可能被多次vue.effect（）
//   }
// }
const tragetsMap = new WeakMap();
function track(traget, key) {
  //traget中的key变化了就要执行数组中的方法
  const effect = activeEffectStacks[activeEffectStacks.length - 1];
  if (effect) {
    //有对应关系，才创建关联
    let depsMap = tragetsMap.get(traget);
    if (!depsMap) {
      //第一次没有值
      tragetsMap.set(traget, (depsMap = new Map()));
    }
    let deps = depsMap.get(key);
    if (!deps) {
      //第一次没有值
      depsMap.set(key, (deps = new Set()));
    }
    if (!deps.has(effect)) {
      deps.add(effect);
    }
    //动态创建依赖关系
  }
  //没有对应关系不做
}

function trigger(traget, type, key) {
  const depsMap = tragetsMap.get(traget);
  if (depsMap) {
    const deps = depsMap.get(key);
    if (deps) {
      deps.forEach(effect => {
        //执行当前key对应的所有effect
        effect();
      });
    }
  }
}

/** 响应式 副作用 */
function effect(fn) {
  // 需要把fn变成响应式函数
  const effect = createReactiveEffect(fn);
  effect(); //默认执行一次
}

/** 创建响应式函数*/
function createReactiveEffect(fn) {
  const effect = function() {
    try {
      // 1，并把effect存到栈里; 2 fn执行
      activeEffectStacks.push(effect);
      fn(); // js单线程，里面的属性操作 会调用 proxy的 拦截操作
    } finally {
      //出栈
      activeEffectStacks.pop(effect);
    }
  };
  return effect;
}
