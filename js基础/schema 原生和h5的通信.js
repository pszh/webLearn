//https://blog.csdn.net/u013424496/article/details/51991541
//封装 schema
function _invoke(actions, data, callback) {
  //拼接 schema协议
  const schema = `myapp://jsbridge/${actions}?`;

  //拼接参数
  const arr = [];
  for (let key in data) {
    arr.push(`${key}=${data.key}`);
    schema += arr.join("&");
  }
  // 处理callback
  let callbackName = "";
  if (typeof callback === "string") {
    callbackName = callback;
  } else {
    callbackName = actions + Date.now();
    window[callbackName] = callbackName;
  }
  schema += "&callback=callbackName";

  // 触发
  let iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = schema; // 不能少
  const body = document.body;
  body.appendChild(iframe);
  setTimeout(() => {
    body.removeChild(iframe);
    iframe = null;
  });
}

//暴露到全局变量
window.invoke = {
  share: (data, callback) => {
    _invoke("share", data, callback);
  },
  scan: (data, callback) => {
    _invoke("scan", data, callback);
  },
  login: (data, callback) => {
    _invoke("login", data, callback);
  }
};
