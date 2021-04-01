const template = require('art-template');
const path = require('path');
const dateFormat = require('dateformat');
//拼接路径
// const views = path.join(__dirname, 'views', '04.art');

//设置模板的根目录
template.defaults.root = path.join(__dirname, 'views');
//导入模板变量
template.defaults.imports.dateFormat = dateFormat;
//设置模板的默认后缀
template.defaults.extname = '.art';

const html = template('05', {
    time: new Date()
});
console.log(html);