//引入joi模块
const Joi = require('joi');

// 定义对象的验证规则
module.exports = async(req, res) => {
    const schema = Joi.object({
        username: Joi.string().min(2).max(20).required().error(new Error('用户名没有通过验证')),
        email: Joi.string().email().required().error(new Error('邮箱没有通过验证')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码没有通过验证')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
    });
    try {
        //实施验证
        await schema.validateAsync({
            username: 'ab',
            email: '123'
        });
    } catch (ex) {
        console.log(ex.message);
        return;
    }
    console.log('验证通过');
}


// async function run() {
//     const schema = Joi.object({
//         username: Joi.string().min(2).max(6).required().error(new Error('username属性没有通过验证')),
//     });
//     try {
//         //实施验证
//         await schema.validateAsync({ username: 'abcdefg' });
//     } catch (ex) {
//         console.log(ex.message);
//         return;
//     }
//     console.log('验证通过');
// }
// run();