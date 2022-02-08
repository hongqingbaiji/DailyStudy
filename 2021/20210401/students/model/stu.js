const mongoose = require('mongoose');

//创建集合规则
const stuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, '姓名为必填项'],
        minlength: 2,
        maxlength: 10
    },
    age: {
        type: Number,
        required: [true, '年龄为必填项'],
        min: 1,
        max: 100
    },
    sex: {
        type: String,
        required: [true, '性别为必填项'],
    },
    email: String,
    hobbies: [String],
    college: String,
    enterDate: {
        type: Date,
        default: Date.now
    }

});
//创建集合
const Stu = mongoose.model('Stu', stuSchema);
//导出Stu
module.exports = Stu;

// 静态添加数据
// Stu.create({
//     name: '张三',
//     age: 20,
//     sex: '男',
//     email: 'zhangsan@163.com',
//     hobbies: '篮球',
//     college: '软件学院',
//     enterDate: '2013/9/1'
// }).then(doc => console.log(doc)).catch(err => console.log(err));