const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground', {
        //避免‘当前服务器发现和监视引擎已弃用’错误
        useUnifiedTopology: true,
        //避免‘当前URL字符串解析器已被弃用’错误
        useNewUrlParser: true
    })
    .then(() => console.log('数据库连接成功'))
    .catch(err => console.log(err, '数据库连接失败'));

//创建集合规则
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    isPublished: Boolean
});
// 创建集合
const Course = mongoose.model('Course', courseSchema); //courses

//创建集合实例
const course = new Course({
    name: 'Node.js',
    author: 'wenhe',
    isPublished: true
});
//将数据保存到数据库中
course.save();

//使用create()方法创建文档
// Course.create([{
//     name: 'JavaScript',
//     author: 'baiji',
//     isPublished: false
// }, {
//     name: 'PHP',
//     author: 'pink',
//     isPublished: true
// }], (err, doc) => {
//     console.log(err); //错误对象
//     console.log(doc); //当前插入的文档
// });

Course.create([{
    name: 'JavaScript',
    author: 'baiji',
    isPublished: false
}, {
    name: 'PHP',
    author: 'pink',
    isPublished: true
}]).then(doc => console.log(doc)).catch(err => console.log(err));