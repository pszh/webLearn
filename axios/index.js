/**
 * 简单的分装对axios
 * （1）多接口的一个loading处理
 *  (2）基础配置的设置
 * //使用
 * import myAxios from "这个文件";
 * myAxios
 * .request({
 *   url: "/api/getInfo", // 参数?id=12
 *   method: "get"
 *   // params :{ id: 12}
 * })
 * .then(() => {});

 * myAxios.request({
 *   url: "/api/create",
 *    method: "post",
 *    data: {
 *      name: "lala",
 *      age: 2
 *    }
 *  });
 *
 */

const axios = require("axios");
const store = require("vue中的状态管理器");

class Request {
  constructor() {
    this.baseUrl =
      process.env.NODE_EVN === "production" ? "/" : "http://localhost:3000";
    this.timeout = 3000;
    this.queue = {}; //存放每次的请求
  }
  merge(options) {
    return { baseURL: this.baseUrl, timeout: this.timeout, ...options };
  }
  setInterceptor(instance, url) {
    //每次请求时，加一个loading效果
    //更改请求头
    instance.interceptors.request.use(config => {
      config.headers.Authorization = "XXX";
      if (Object.keys(this.queue).length === 0) {
        store.commit("showLoading");
      }
      this.queue[url] = url;
      return config;
    });

    //如果上一个promise返回一个常量，会作为下一个promise的输入
    instance.interceptors.response.use(res => {
      delete this.queue[url]; // 每次请求删除队列中路径
      if (Object.keys(this.queue).length === 0) {
        store.commit("hideLoading");
      }
      return res.data;
    });
  }
  request(options) {
    const instance = axios.create(); //创建一个axios实例
    this.setInterceptor(instance, options.url);
    let configer = merge(options);
    return instance(configer); //axios执行后返回的是一个promise
  }
}

export default new Request();
