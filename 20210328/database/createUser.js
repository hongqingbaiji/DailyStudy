const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground', {
        //避免‘当前服务器发现和监视引擎已弃用’错误
        useUnifiedTopology: true,
        //避免‘当前URL字符串解析器已被弃用’错误
        useNewUrlParser: true
    })
    .then(() => console.log('数据库连接成功'))
    .catch(err => console.log(err, '数据库连接失败'));

//创建集合
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    password: String,
    hobbies: [String]
});

const User = mongoose.model('User', userSchema);

//创建文档
User.create({
    name: 'zs',
    age: 18,
    email: 'zhangsan@163.com',
    password: '123456',
    hobbies: ['打篮球']
}, (err, doc) => {
    console.log(err);
    console.log(doc);
});