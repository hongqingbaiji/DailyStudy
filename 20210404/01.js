//引入express框架
const express = require('express');
//引入express框架后就不需要引入http模块也能创建网站服务器了
//创建网站服务器 
const app = express();

app.get('/', (req, res) => {
    // 用send() 取代 end() 来向客户端做出响应
    //send方法内部会检测响应内容的类型
    //send方法会自动设置http状态码
    //send方法会帮我们自动设置响应的内容类型和编码
    res.send('hello express');
});

app.get('/list', (req, res) => {
    res.send({ name: 'zs', age: 20 });
});
//监听端口
app.listen(3000);
console.log('网站服务器已启动');