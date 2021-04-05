//引入express框架
const express = require('express');
//创建网站服务器
const app = express();
const path = require('path');

const public = path.join(__dirname, 'public');
//实现静态资源访问功能
app.use('/static', express.static(public));

// 监听端口
app.listen(3000);
console.log('网站服务器已启动');