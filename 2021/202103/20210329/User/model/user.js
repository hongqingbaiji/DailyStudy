const mongoose = require('mongoose');

//创建用户集合
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 10
    },
    age: {
        type: Number,
        min: 18,
        max: 60
    },
    email: String,
    password: String,
    hobbies: [String]
});
//创建集合
const User = mongoose.model('User', userSchema);

//导出User
module.exports = User;