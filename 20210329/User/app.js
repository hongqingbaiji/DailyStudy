// 1、搭建网站服务器，实现客户端与服务器端的通信
// 2、连接数据库，创建用户集合，向集合中插入文档
// 3、当用户访问/list时，将所有用户信息查询出来
//      实现路由功能，
//      呈现用户列表页面
//      从数据库中查询用户信息，将用户信息展示在列表中
// 4、将用户信息和表格HTML进行拼接并将拼接结果响应回客户端
// 5、当用户访问/add时，呈现表单页面，并实现添加用户信息功能
// 6、当用户访问/modify时，呈现修改页面，并实现修改用户信息功能
// 7、当用户访问/delete时，实现用户删除功能


const http = require('http');
const mongoose = require('mongoose');
const url = require('url');


// 创建web服务器
const app = http.createServer();
//为服务器对象添加请求事件
app.on('request', async(req, res) => {
    const method = req.method;
    const { pathname } = url.parse(req.url);
    res.writeHead(200, {
        'content-type': 'text/html;charset=utf8'
    });
    if (method == 'GET') {
        if (pathname == '/list') {
            res.end();
        }
    } else if (method == 'POST') {

    }
});

//监听端口
app.listen(3000);
console.log('网站服务器启动成功');


//连接数据库
mongoose.connect('mongodb://localhost/playground', {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => console.log('数据库连接成功'))
    .catch(err => console.log(err, '数据库连接失败'));

//创建用户集合
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 10
    },
    age: {
        type: Number,
        min: 18,
        max: 60
    },
    email: String,
    password: String,
    hobbies: [String]
});
//创建集合
const User = mongoose.model('User', userSchema);

//

// //创建用户
// User.create({
//         name: 'wenhe',
//         age: 28,
//         email: 'wenhe@163.com',
//         password: '123456',
//         hobbies: ['敲代码']
//     })
//     .then(doc => console.log(doc))
//     .catch(err => console.log(err));