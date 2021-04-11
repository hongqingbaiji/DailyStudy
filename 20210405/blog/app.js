// 项目的入口
// 引入express框架
const express = require('express');
// 引入path模块
const path = require('path');
// 引入body-parser模块
const bodyParser = require('body-parser');
// 引入express-session模块
const session = require('express-session');
// 创建网站服务器
const app = express();
//数据库连接
require('./model/connect');
// require('./model/user'); // 创建一个管理员用户
// 处理post请求参数
app.use(bodyParser.urlencoded({ extended: false }));
//配置session
app.use(session({
    secret: 'secret key',
    resave: true,
    saveUninitialized: true

}));

// 告诉express框架使用什么模板引擎渲染什么后缀的模板文件
app.engine('art', require('express-art-template'));
// 告诉express框架模板所在的位置
app.set('views', path.join(__dirname, 'views'));
// 告诉express框架模板的默认后缀是什么
app.set('view engine', 'art');

// 开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));

//导入路由模块 home 和 admin
const home = require('./route/home');
const admin = require('./route/admin');

//拦截请求，判断用户的登录状态
app.use('/admin', require('./middleware/loginGuard'));
//为路由匹配请求路径
app.use('/home', home);
app.use('/admin', admin);

//错误处理中间件
app.use((err, req, res, next) => {
    //将字符串转换成对象类型 JSON.parse()
    const result = JSON.parse(err);
    res.redirect(`${result.path}?message=${result.message}`);
});

// 监听端口
app.listen(80);
console.log('网站服务器启动成功');