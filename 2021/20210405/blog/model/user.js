//设定用户集合
//引入mongoose模块
const mongoose = require('mongoose');
//引入 bcrypt
const bcrypt = require('bcrypt');
//引入joi模块
const Joi = require('joi');
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
        // unique: false
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

async function createUser() {
    const salt = await bcrypt.genSalt(10);
    const pwd = await bcrypt.hash('123456', salt);
    const user = await User.create({
        username: 'admin',
        email: 'admin@163.com',
        password: pwd,
        role: 'admin',
        state: 0
    });
}
// createUser();

//验证用户信息
const validateUser = user => {
    //验证规则
    const schema = Joi.object({
        username: Joi.string().min(2).max(20).required().error(new Error('用户名没有通过验证')),
        email: Joi.string().email().required().error(new Error('邮箱没有通过验证')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码没有通过验证')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
    });
    //实施验证
    return schema.validateAsync(user);
}

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
    User,
    validateUser
}