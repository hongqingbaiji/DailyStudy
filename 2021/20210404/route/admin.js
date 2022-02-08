//引入express框架
const express = require('express');
//创建路由对象
const admin = express.Router();
admin.use('/index', (req, res, next) => {
    res.send('欢迎来到博客管理页面');

});

module.exports = admin;