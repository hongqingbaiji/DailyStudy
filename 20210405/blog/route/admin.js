//创建博客的后台管理页面
//引入express框架
const express = require('express');
//创建博客后台管理页面路由
const admin = express.Router();
//挂载二级路由
admin.get('/login', (req, res) => {
    res.render('admin/login');
});

//实现登录功能
admin.post('/login', (req, res) => {
    //接收请求参数
    const { email, password } = req.body;
    // 如果用户没有输入邮件地址
    if (email.trim().length == 0 || password.trim().length == 0) {
        // return res.status(400).send('<h4>邮箱地址或者密码错误</h4>');
        return res.status(400).render('../views/admin/error', {
            msg: '邮箱地址或者密码错误'
        });
    }
});

admin.get('/user', (req, res) => {
    res.render('admin/user');
});
//将路由对象作为模块成员进行导出
module.exports = admin;