// 项目的入口
// 引入express框架
const express = require('express');
// 引入path模块
const path = require('path');
// 创建网站服务器
const app = express();

//数据库连接
require('./model/connect');
// require('./model/user'); // 创建一个管理员用户

// 告诉express框架使用什么模板引擎渲染什么后缀的模板文件
app.engine('art', require('express-art-template'));
// 告诉express框架模板所在的位置
app.set('views', path.join(__dirname, 'views'));
// 告诉express框架模板的默认后缀是什么
app.set('view engine', 'art');

// 开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));



//导入路由模块 home 和 admin
const home = require('./route/home');
const admin = require('./route/admin');
//为路由匹配请求路径
app.use('/home', home);
app.use('/admin', admin);

// 监听端口
app.listen(80);
console.log('网站服务器启动成功');