#! /usr/bin/env node

// 1）需要找到当前执行名的路径 拿到webpack.config.js

let path = require("path");
// config配置文件
let config = require(path.resolve("webpack.config.js"));

const Compiler = require("../lib/Compiler.js");
let compile = new Compiler(config);
compile.hooks.entryOption.call();
compile.run();
console.log("aa");
