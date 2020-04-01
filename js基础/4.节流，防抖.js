//节流  如果在定时器的时间范围内再次触发，则不予理睬，等当前定时器完成，才能启动下一个定时器任务。(只响应第一次)
//  eg：王者回程过程中，你在按回程是没用的，只能等第一次回到家之后回程,
function throttle(fn, interval) {
  let flag = true;
  return (...args)=> {
    let context = this;
    console.log('b',flag)
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(context, args);
      flag = true;
    }, interval);
  };
};

//test 
i=0
b = setInterval(throttle(()=>{console.log(i++)},100),50)

setTimeout(() => {
  clearInterval(b)
}, 201);

//防抖 每次事件触发则删除原来的定时器，建立新的定时器，(只响应最后一次)
//eg，正在回城，被打断了，只能重新回城

function debounce(fn, delay) {
  let timer = null;
  return  (...args) => {
    let context = this;
    if(timer) clearTimeout(timer);
    console.log('timer',timer);
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  }
}

//test 输出是0，因为()=>{console.log(i++)没有被执行
i=0;
b = setInterval(debounce(()=>{console.log(i++)},100),50)

setTimeout(() => {
  clearInterval(b)
}, 210);

//组合 http://47.98.159.95/my_blog/perform/003.html#%E8%8A%82%E6%B5%81