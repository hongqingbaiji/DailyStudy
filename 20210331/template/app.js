//导入模板引擎
const template = require('art-template');
const path = require('path');

//path.join 是拼接字符串的
const views = path.join(__dirname, 'views', 'index.art');
//template第一个参数是模板路径，最好是绝对路径，
// 第二个参数是要在模板中显示的数据
// 返回的是拼接好的字符串
const html = template(views, {
    name: 'wenhe',
    age: 29
});
console.log(html);