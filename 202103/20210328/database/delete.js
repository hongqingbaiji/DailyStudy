const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground', {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => console.log('数据库连接成功'))
    .catch(err => console.log(err, "数据库连接失败"));

// 创建集合
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    password: String,
    hobbies: [String]
});
const User = mongoose.model('User', userSchema);

// //删除文档
// //查找到一条文档并且删除他，如果查找到多条文档，取第一条
// User.findOneAndDelete({ name: 'sn' })
//     .then(result => console.log(result));

// 更新文档
// User.updateOne({ name: 'ls' }, { name: '李四', email: 'lisisi@qq.com' })
//     .then(result => console.log(result));

User.updateMany({}, { password: '12345' })
    .then(result => console.log(result));