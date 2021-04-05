//设定用户集合
//引入mongoose模块
const mongoose = require('mongoose');
//创建用户集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        // 保证邮箱地址在插入数据库时不重复
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 16
    },
    //可以规定admin代表超级管理员 ，normal 代表普通用户
    role: {
        type: String,
        required: true
    },
    state: {
        type: Number,
        default: 0 //该字段默认为0，默认0是启用状态，1是禁用状态
    }
});
// 创建集合
const User = mongoose.model('User', userSchema);

//创建用户
// User.create({
//         username: 'admin',
//         email: 'admin@163.com',
//         password: '123456',
//         role: 'admin',
//         state: 0
//     })
//     .then(() => { console.log('用户创建成功') })
//     .catch(() => { console.log('用户创建失败') });

// 导出User
module.exports = {
    User: User
}