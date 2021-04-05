//引入express框架
const express = require('express');
//创建网站服务器
const app = express();
const path = require('path');

//1、告诉express框架使用什么模板引擎渲染什么后缀的模板文件
app.engine('art', require('express-art-template'));
//2、告诉express框架模板存放在什么位置
app.set('views', path.join(__dirname, 'views'));
//3、告诉express框架模板的默认后缀是什么
app.set('view engine', 'art');

app.locals.users = [{
    name: 'wenhe',
    age: 29
}, {
    name: 'lisi',
    age: 22
}]

app.get('/index', (req, res) => {
    res.render('index', {
        msg: 'message'
    });
});
app.get('/list', (req, res) => {
    res.render('list', {
        msg: 'list page'
    })
})

// 监听端口
app.listen(3000);
console.log('网站服务器已启动');