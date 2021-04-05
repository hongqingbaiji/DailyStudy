//创建博客的后台管理页面
//引入express框架
const express = require('express');
//创建博客后台管理页面路由
const admin = express.Router();
//挂载二级路由
admin.get('/login', (req, res) => {
    res.render('admin/login');
});

admin.get('/user', (req, res) => {
    res.render('admin/user');
});
//将路由对象作为模块成员进行导出
module.exports = admin;