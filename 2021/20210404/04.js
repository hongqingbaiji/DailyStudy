//引入express框架
const express = require('express');
//创建网站服务器
const app = express();

// app.use((req, res, next) => {
//     res.send('当前网站正在维护...');
// });

app.use('/admin', (req, res, next) => {
    // 模拟用户未登录
    let isLogin = false;
    if (isLogin) {
        next();
    } else {
        res.send('您还没有登录，不能访问/admin页面');
    }
});
app.use('/admin', (req, res) => {
    res.send('您已经登录，可以访问当前页面');
});

app.use((req, res, next) => {
    res.status(404).send('当前访问的页面不存在');
});

//监听端口
app.listen(3000);
console.log('网站服务器启动成功');