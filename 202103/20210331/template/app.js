//导入模板引擎
const template = require('art-template');
const path = require('path');

//path.join 是拼接字符串的
// const views = path.join(__dirname, 'views', 'index.art');
const views = path.join(__dirname, 'views', '04.art');
//template第一个参数是模板路径，最好是绝对路径，
// 第二个参数是要在模板中显示的数据
// 返回的是拼接好的字符串
const html = template(views, {
    // users: [{
    //     name: 'wenhe',
    //     age: 19,
    //     sex: '男'
    // }, {
    //     name: 'meili',
    //     age: 17,
    //     sex: '女'
    // }, {
    //     name: '大王',
    //     age: 33,
    //     sex: '男'
    // }]
    msg: 'hello'
});
console.log(html);