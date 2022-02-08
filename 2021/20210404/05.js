//引入express框架
const express = require('express');
const fs = require('fs');
//创建网站服务器
const app = express();


// app.use('/index', (req, res) => {
//     //抛出一个错误
//     // throw new Error('程序发生了未知错误');
// });

app.use('/index', (req, res, next) => {
    fs.readFile('./01.js', 'utf-8', (err, result) => {
        if (err != null) {
            next(err);
        } else {
            res.send(result);
        }
    });
});

app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});

//监听端口
app.listen(3000);
console.log('网站服务器启动成功');