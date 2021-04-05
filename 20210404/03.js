//引入express框架
const express = require('express');
//创建网站服务器
const app = express();

app.use((req, res, next) => {
    console.log('请求走了app.use中间件');
    next();
});
//当客户端请求 request 时
app.use('/request', (req, res, next) => {
    console.log('请求走了 /request 中间件');
    next();
});
app.use('/request', (req, res, next) => {
    req.name = 'wenhe';
    next();
});
app.use('/request', (req, res, next) => {
    res.send(req.name);
});

//监听端口
app.listen(3000);
console.log('网站服务器启动成功');