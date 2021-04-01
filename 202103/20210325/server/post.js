//用于创建网站服务器的模块
const http = require('http');
//app对象就是网站服务器对象
const app = http.createServer();
//处理请求参数模块
const querystring = require('querystring');
app.on('request', (req, res) => {

    let postParams = '';
    req.on('data', params => {
        postParams += params;
    });
    req.on('end', () => {
        console.log(querystring.parse(postParams));
    });
    res.end('ok');
});
// 监听事件
app.listen(3000);
console.log('网站服务器启动成功');