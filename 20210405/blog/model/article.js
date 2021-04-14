//设定文章集合
// 1. 引入mongoose模块
const mongoose = require('mongoose');
// 2. 创建文章集合规则
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 20,
        minlength: 4,
        required: [true, '请填写文章标题']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, '请传递作者']
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    cover: {
        type: String,
        default: null
    },
    content: {
        type: String
    }
});
// 3. 根据规则创建集合
const Article = mongoose.model('Article', articleSchema);

// //创建文章
// Article.create({
//         title: '我是标题标题',
//         author: 'admin',
//         content: '我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容'
//     })
//     .then(() => { console.log('文章创建成功') })
//     .catch(() => { console.log('文章创建失败') });

// 4. 将集合规则作为模块成员进行导出
module.exports = {
    Article: Article
}