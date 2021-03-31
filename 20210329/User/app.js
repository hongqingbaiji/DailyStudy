// 1、搭建网站服务器，实现客户端与服务器端的通信
// 2、连接数据库，创建用户集合，向集合中插入文档
// 3、当用户访问/list时，将所有用户信息查询出来
//      实现路由功能，
//      呈现用户列表页面
//      从数据库中查询用户信息，将用户信息展示在列表中
// 4、将用户信息和表格HTML进行拼接并将拼接结果响应回客户端
// 5、当用户访问/add时，呈现表单页面，并实现添加用户信息功能
// 6、当用户访问/modify时，呈现修改页面，并实现修改用户信息功能
//      1)增加页面路由，呈现页面
//          在点击修改按钮时，将用户ID传递到当前页面
//          从数据库中查询当前用户信息，将用户信息展示到页面中
//      2)实现用户修改功能
//          指定表单的提交地址以及请求方式
//          接受客户端传递过来的修改信息，找到用户，将用户信息更改为最新的
// 7、当用户访问/delete时，实现用户删除功能


const http = require('http');
const url = require('url');
const querystring = require('querystring');

// 导入连接数据库的模块
require('./model/index');
//导入User模块
const User = require('./model/user');

// 创建web服务器
const app = http.createServer();
//为服务器对象添加请求事件
app.on('request', async(req, res) => {
    const method = req.method;
    //请求地址
    const { pathname, query } = url.parse(req.url, true);
    res.writeHead(200, {
        'content-type': 'text/html;charset=utf8'
    });
    if (method == 'GET') {
        if (pathname == '/list') {
            // 使用异步的方式查询数据
            let users = await User.find();
            let list = `
            <!DOCTYPE html>
            <html lang="en">
            
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <style>
                    .btnUser {
                        margin-bottom: 10px;
                        cursor: pointer;
                    }
                    
                    table,
                    th,
                    td {
                        border: 1px solid #ccc;
                        border-collapse: collapse;
                    }
                    
                    th {
                        background-color: #eee;
                    }
                    
                    th,
                    td {
                        padding: 10px 20px;
                    }
                </style>
            </head>
            
            <body>
                <h5>
                    <a href="/add">填加用户</a>
                </h5>
                <form action="localhost:3000" method="GET">
                    <table>
                        <thead>
                            <tr>
                                <th>用户名</th>
                                <th>年龄</th>
                                <th>爱好</th>
                                <th>游戏</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
            `;

            // 对数据库进行循环操作
            users.forEach(item => {
                list += `
                <tr>
                <td>${item.name}</td>
                <td>${item.age}</td>
                <td>
                `;

                //再次对爱好这个数组进行循环操作
                item.hobbies.forEach(item => {
                    list += `
                        <span>${item}</span>
                    `;
                });


                list += `
                </td>
                <td>${item.email}</td>
                <td>
                    <a href="/modify?id=${item._id}">修改</a>
                    <a href="/delete?id=${item._id}">删除</a>
                </td>
                </tr>
                `;
            });

            list += `
            </tbody>
            </table>
            </form>
        </body>
        
        </html>
            `;
            res.end(list);
        } else if (pathname == '/add') {
            let add = `
            <!DOCTYPE html>
            <html lang="en">
            
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>用户列表</title>
                <style>
                    .main {
                        width: 500px;
                        margin: 20px 100px;
                    }
                    
                    label {
                        font-size: 14px;
                        font-weight: 700;
                        height: 30px;
                    }
                    
                    .inp1 {
                        width: 500px;
                        height: 30px;
                        outline: none;
                        margin: 10px 0;
                        padding-left: 5px;
                        border: 1px solid #ccc;
                    }
                    
                    .check label {
                        font-weight: 400;
                        margin-right: 5px;
                    }
                    
                    .submit {
                        padding: 5px 20px;
                        margin-top: 10px;
                    }
                </style>
            </head>
            
            <body>
                <div class="main">
                    <h3>添加用户</h3>
                    <form method="post" action="/add">
                        <label for="uname">用户名</label><br>
                        <input type="text" name="name" class="inp1" id="uname" placeholder="请填写用户名"><br>
                        <label for="pwd">密码</label><br>
                        <input type="password" name="password" class="inp1" id="pwd" placeholder="请输入密码"><br>
                        <label for="age">年龄</label><br>
                        <input type="text" name="age" id="age" class="inp1" placeholder="请输入年龄"><br>
                        <label for="email">邮箱</label><br>
                        <input type="email" name="email" id="email" class="inp1" placeholder="请填写邮箱"><br>
                        <label>请选择爱好</label><br>
                        <div class="check">
                            <input type="checkbox" name="hobbies" id="zq" value="足球"><label for="zq">足球</label>
                            <input type="checkbox" name="hobbies" id="lq" value="蓝球"><label for="lq">蓝球</label>
                            <input type="checkbox" name="hobbies" id="glq" value="橄榄球"><label for="glq">橄榄球</label>
                            <input type="checkbox" name="hobbies" id="qdm" value="敲代码"><label for="qdm">敲代码</label>
                            <input type="checkbox" name="hobbies" id="cy" value="抽烟"><label for="cy">抽烟</label>
                            <input type="checkbox" name="hobbies" id="hj" value="喝酒"><label for="hj">喝酒</label>
                            <input type="checkbox" name="hobbies" id="tt" value="烫头"><label for="tt">烫头</label>
                        </div>
                        <input type="submit" value="添加用户" class="submit">
                    </form>
                </div>
            
            </body>
            
            </html>
            `;
            res.end(add);
        } else if (pathname == '/modify') {
            //根据_id 查询当前的用户信息
            let user = await User.findOne({ _id: query.id });
            let hobbies = ['足球', '篮球', '橄榄球', '敲代码', '抽烟', '喝酒', '烫头'];
            //呈现修改用户表单页面
            let modify = `
            <!DOCTYPE html>
            <html lang="en">
            
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>用户列表</title>
                <style>
                    .main {
                        width: 500px;
                        margin: 20px 100px;
                    }
                    
                    label {
                        font-size: 14px;
                        font-weight: 700;
                        height: 30px;
                    }
                    
                    .inp1 {
                        width: 500px;
                        height: 30px;
                        outline: none;
                        margin: 10px 0;
                        padding-left: 5px;
                        border: 1px solid #ccc;
                    }
                    
                    .check label {
                        font-weight: 400;
                        margin-right: 5px;
                    }
                    
                    .submit {
                        padding: 5px 20px;
                        margin-top: 10px;
                    }
                </style>
            </head>
            
            <body>
                <div class="main">
                    <h3>修改用户</h3>
                    <form method="post" action="/modify?id=${user._id}">
                        <label for="uname">用户名</label><br>
                        <input type="text" value="${user.name}" name="name" class="inp1" id="uname" placeholder="请填写用户名"><br>
                        <label for="pwd">密码</label><br>
                        <input type="password" value="${user.password}" name="password" class="inp1" id="pwd" placeholder="请输入密码"><br>
                        <label for="age">年龄</label><br>
                        <input type="text" value="${user.age}" name="age" id="age" class="inp1" placeholder="请输入年龄"><br>
                        <label for="email">邮箱</label><br>
                        <input type="email" value="${user.email}" name="email" id="email" class="inp1" placeholder="请填写邮箱"><br>
                        <label>请选择爱好</label><br>
                        <div class="check">
             `;

            hobbies.forEach(item => {
                let isHobby = user.hobbies.includes(item);
                if (isHobby) {
                    modify += `
                    <input type="checkbox" name="hobbies" id="tt" value="${item}" checked><label for="tt">${item}</label>
                    `;
                } else {
                    modify += `
                    <input type="checkbox" name="hobbies" id="tt" value="${item}"><label for="tt">${item}</label>
                    `;
                }
            });
            modify += `
                    </div>
                        <input type="submit" value="确认修改" class="submit">
                    </form>
                </div>
            
            </body>
            
            </html>
            `;
            res.end(modify);
        } else if (pathname == '/delete') {
            await User.findOneAndDelete({ _id: query.id });
            res.writeHead(301, {
                Location: '/list'
            });
            res.end();
        }
    } else if (method == 'POST') {
        //用户添加功能
        if (pathname == '/add') {
            //接收用户提交的信息
            let formData = '';
            //接收post参数
            req.on('data', param => {
                formData += param;
            });
            //post参数接收完毕
            req.on('end', async() => {
                // console.log(querystring.parse(formData));
                let user = querystring.parse(formData);
                //将用户信息添加到数据库中
                await User.create(user);
                //重定向，重定向代码是301，Location是跳转地址
                res.writeHead(301, {
                    Location: '/list'
                });
                res.end();
            });
        } else if (pathname == '/modify') {
            //接收用户提交的信息
            let formData = '';
            //接收post参数
            req.on('data', param => {
                formData += param;
            });
            //post参数接收完毕
            req.on('end', async() => {
                let user = querystring.parse(formData);
                //将用户信息添加到数据库中
                await User.updateOne({ _id: query.id }, user);
                //重定向，重定向代码是301，Location是跳转地址
                res.writeHead(301, {
                    Location: '/list'
                });
                res.end();
            });
        }
    }
});

//监听端口
app.listen(3000);
console.log('网站服务器启动成功');