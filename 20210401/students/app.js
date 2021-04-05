// 学生档案管理：制作流程
// 1、建立项目文件夹并生成项目描述文件
// 2、创建网站服务器实现客户端和服务器端通信
// 3、连接数据库并根据需求设计学院信息表
// 4、创建路由并实现页面模板呈递
// 5、实现静态资源访问
// 6、实现学生信息添加功能
// 7、实现学生信息展示功能

//引入HTTP模块
const http = require('http');
//引入模板引擎
const template = require('art-template');
//引入PATH模块
const path = require('path');
//引入静态资源访问模块
const serveStatic = require('serve-static');
//引入处理日期的第三方模块
const dateFormat = require('dateformat');

// 导入连接数据库的模板
require('./model/content');
// 导入路由模块
const router = require('./route/route');
// 连接数据库
const app = http.createServer();

//实现静态资源访问服务
const serve = serveStatic(path.join(__dirname, 'public'));
//设置模板的根目录
template.defaults.root = path.join(__dirname, 'views');
//处理日期格式的方法
template.defaults.imports.dateFormat = dateFormat;
//当客户端访问服务器端的时候
app.on('request', async(req, res) => {
    //启用路由功能,函数是必填项
    router(req, res, () => {});
    //启用静态资源访问服务功能
    serve(req, res, () => {});
});
//端口监听，默认是80端口
app.listen(80);
console.log('网站服务器已启动');