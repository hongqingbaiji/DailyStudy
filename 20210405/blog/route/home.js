//创建博客的展示页面
//引入express框架
const express = require('express');
//创建博客展示页面路由
const home = express.Router();
//挂载二级路由
home.get('/', (req, res) => {
    res.send('欢迎来到博客首页');
});
//将路由对象作为模块成员进行导出
module.exports = home;