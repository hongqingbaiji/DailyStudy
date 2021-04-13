//设定文章集合
//引入mongoose模块
const mongoose = require('mongoose');
// 创建文章集合规则
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 20,
        minlength: 4,
        required: [true, '请填写文章标题']
    },

});