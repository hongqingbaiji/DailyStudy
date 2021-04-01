const http = require('http');
const app = http.createServer();
const url = require('url');
app.on('request', (req, res) => {
    //获取请求方式
    const method = req.method.toLowerCase();
    //获取请求地址
    const pathname = url.parse(req.url).pathname;
    res.writeHead(200, {
        'content-type': 'text/html;charset=utf8'
    });
    if (method == 'get') {
        if (pathname == '/' || pathname == '/index') {
            res.end('欢迎来到首页');
        } else if (pathname == '/list') {
            res.end('欢迎来到列表页');
        } else {
            res.end('访页面不存在');
        }
    } else if (method == 'post') {

    }
});
app.listen(3000);
console.log('服务器已启动');