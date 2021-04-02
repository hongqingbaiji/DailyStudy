// 学生档案管理：制作流程
// 1、建立项目文件夹并生成项目描述文件
// 2、创建网站服务器实现客户端和服务器端通信
// 3、连接数据库并根据需求设计学院信息表
// 4、创建路由并实现页面模板呈递
// 5、实现静态资源访问
// 6、实现学生信息添加功能
// 7、实现学生信息展示功能

//创建网站服务器

const { timeStamp } = require('console');

// 导入连接数据库的模板
require('./model/content');
//导入Stu模块
const Stu = require('./model/stu');

const http = require('http');
const app = http.createServer();
const url = require('url');
const template = require('art-template');
const path = require('path');
const dateFormat = require('dateformat');

const getRouter = require('router');
//获取路由对象
const router = getRouter();

//设置模板的根目录
template.defaults.roots = path.join(__dirname, 'views');
//导入模板变量
template.defaults.imports.dateFormat = dateFormat;
//设置模板的默认后缀
template.defaults.extname = '.art';


app.on('request', async(req, res) => {
    //获取请求方式
    const method = req.method;
    // 获取请求地址
    let { pathname, query } = url.parse(req.url, true);
    // 响应报文以及字符编码
    res.writeHead(200, {
        "content-type": "text/html;charset=utf8"
    });


    if (method == 'GET') {
        if (pathname == '/list') {
            //使用异步的方式查询数据
            let stus = await Stu.find();
            console.log(stus);
            const html = template('layout', {

            });

        }
    } else if (method == "POST") {

    } else {
        res.end('访问页面不存在');
    }

});
app.listen(80);
console.log('网站服务器已启动');