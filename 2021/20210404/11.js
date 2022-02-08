//引入express框架
const express = require('express');
// 引入body-parser模块
const bodyParser = require('body-parser');
//创建网站服务器
const app = express();

app.use(fn());

function fn() {
    return function(req, res, next) {
        console.log(req.method);
        next();
    }
}
app.get('/', (req, res) => {
    res.send('ok');
});

// 监听端口
app.listen(3000);
console.log('网站服务器已启动');