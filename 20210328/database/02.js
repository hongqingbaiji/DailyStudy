const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground', {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => console.log('数据库连接成功'))
    .catch(err => console.log(err, '数据库连接失败'));

//用户集合规则
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});
// 文章集合规则
const postSchema = new mongoose.Schema({
    title: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
//创建用户集合
const User = mongoose.model('User', userSchema);
//创建文章集合
const Post = mongoose.model('Post', postSchema);

//创建用户
User.create({ name: 'wenhe' })
    .then(result => console.log(result));
//创建文章
Post.create({ title: '123', author: '6061e6bb1552301df0c223ea' })
    .then(result => console.log(result));

//查询数据
Post.find().populate('author').then(result => console.log(result));