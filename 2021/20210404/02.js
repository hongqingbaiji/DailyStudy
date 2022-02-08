//引入express框架
const express = require('express');
//创建网站服务器
const app = express();

app.get('/request', (req, res, next) => {
    req.name = 'wenhe';
    next(); //调用next方法，将请求的控制权交给下个中间件
});
app.get('/request', (req, res) => {
    res.send(req.name);
});
//监听端口
app.listen(3000);
console.log('网站服务器启动成功');