//视频时间 上午 1:21:06

// 有一个观察者 被观察者
class Subject{ // 被观察者  vue watch 观察者模式
    constructor(){
        this.arr =[]; // 数组中存放的是观察者
        this.state = '开心';
    }
    setState(newState){
        this.state = newState;
        this.arr.forEach(o=>o.update(this))
    }

    attach(o){ // 挂载观察者
        this.arr.push(o);
    }
}

class Obsever{ //观察者
    constructor(name){
        this.name = name;
    }
    update(s){
        console.log(s.state+'对：'+this.name)
    }
}

// 1）把观察者 放到被观察者上
// 2） 我家一个菇凉 （开心）
// 3） 我和媳妇
// 4） 状态变化了 -》 告诉观察者， 我哭了 （发布订阅）

let s = new Subject('小宝宝');
let o1 = new Obsever('我');
let o2 = new Obsever('媳妇');
s.attach(o1);
s.attach(o2);
s.setState('不开心');