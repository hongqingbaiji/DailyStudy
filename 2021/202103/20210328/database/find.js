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

//创建文档
User.create([{
    name: 'ww',
    age: 33,
    email: 'wangwu@163.com',
    password: 123456,
    hobbies: ['玩游戏', '爬山']
}, {
    name: 'zm',
    age: 20,
    email: 'zhangma@163.com',
    password: 123456,
    hobbies: ['音乐', '电影']
}, {
    name: 'hg',
    age: 20,
    email: 'huge@163.com',
    password: 123456,
    hobbies: ['电影', '读书']
}, {
    name: 'sn',
    age: 20,
    email: 'shaonian@163.com',
    password: 123456,
    hobbies: ['玩游戏', '美食']
}], (err, doc) => {
    console.log(err);
    console.log(doc);
});

// //查找用户集合中的所有文档
// User.find().then(result => console.log(result));

// //根据_id 来查找特定数据
// User.find({ _id: '60612cc905e1c137a8d3c91d' })
//     .then(result => console.log(result));

// 默认返回当前集合中的第一条文档，返回的是一个对象
// User.findOne().then(result => console.log(result));

// //根据name来查找特定数据
// User.findOne({ name: 'wenhe' })
//     .then(result => console.log(result));

// 查询条件，{age:{$gt:19,$lt:40}},查询年龄大于19小于40的值
// User.find({ age: { $gt: 19, $lt: 40 } })
//     .then(result => console.log(result));

// 查询爱好包含玩游戏的用户
// User.find({ hobbies: { $in: ['玩游戏'] } })
//     .then(result => console.log(result));

//查询爱好包含玩游戏的用户的姓名 select()
// User.find({ hobbies: { $in: ['玩游戏'] } })
//     .select('name -_id')
//     .then(result => console.log(result));

// 根据年龄字段进行升序排列
// User.find().sort('age').then(result => console.log(result));
// 根据年龄字段进行降序排列
// User.find().sort('-age').then(result => console.log(result));

//skip跳过前几条数据，limit展示查询的数量
User.find().skip(2).limit(2)
    .then(result => console.log(result));