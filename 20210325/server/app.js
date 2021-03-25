//用于创建网站服务器的模块
const http = require('http');
//用于处理url地址
const url = require('url');
//app对象就是网站服务器对象
const app = http.createServer();
//当客户端有请求来的时候
app.on('request', (req, res) => {


    res.writeHead(200, {
        'content-type': 'text/html;charset=utf8;'
    });

    //获取请求报文信息
    // console.log(req.headers);
    // console.log(req.headers['host']);

    // 获取请求地址
    //url.parse 有两个参数，req.url是要解析的地址；
    //true是要将查询参数解析成对象形式；
    // 然后再通过 .query 获取query属性
    let { query, pathname } = url.parse(req.url, true);
    console.log(query.name); //wenhe
    console.log(query.age); //age

    if (pathname == '/index' || pathname == '/') {
        res.end('<h2>欢迎来到首页</h2>');
    } else {
        res.end('not found');
    }

    //获取请求方式
    // console.log(req.method);
    // if (req.method == 'POST') {
    //     res.end('post');
    // } else if (req.method == 'GET') {
    //     res.end('get');
    // }
    // res.end('<h2>hello,user</h2>');
});
//监听端口
app.listen(3000);
console.log('网站服务器启动成功');