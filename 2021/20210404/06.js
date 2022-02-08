//引入express框架
const express = require('express');
const fs = require('fs');
// 将读取文件改造成异步函数
const promisify = require('util').promisify;
const readFile = promisify(fs.readFile);
//创建网站服务器
const app = express();

app.use('/index', async(req, res, next) => {
    try {
        await readFile('./aaa.js');
    } catch (ex) {
        next(ex);
    }
});

app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});

//监听端口
app.listen(3000);
console.log('网站服务器启动成功');