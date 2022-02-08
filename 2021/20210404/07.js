//引入express框架
const express = require('express');
//创建网站服务器
const app = express();
//创建路由对象
const home = express.Router();
//为路由对象匹配请求路径
app.use('/home', home);

home.use('/index', (req, res, next) => {
    // res.send('欢迎来到博客展示页面');
    req.name = 'zs';
    next();
});
home.use('/index', (req, res, next) => {
    res.send(req.name);
});

// 监听端口
app.listen(3000);
console.log('网站服务器已启动');