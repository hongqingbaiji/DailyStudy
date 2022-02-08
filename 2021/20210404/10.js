//引入express框架
const express = require('express');
// 引入body-parser模块
const bodyParser = require('body-parser');
//创建网站服务器
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.post('/add', (req, res) => {
    //获取post请求参数
    res.send(req.body);
});

// 监听端口
app.listen(3000);
console.log('网站服务器已启动');