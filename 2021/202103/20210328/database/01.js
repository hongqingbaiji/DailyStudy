const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground', {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => console.log('数据库连接成功'))
    .catch(err => console.log(err, '数据库连接失败'));

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, '请传入文章标题'],
        minlength: [2, '标题长度不能小于2'],
        maxlength: [5, '标题长度不能大于5'],
        trim: true
    },
    age: {
        type: Number,
        require: [true, '请输入年龄'],
        min: [18, '你还未成年'],
        max: [60, '您该退休了']
    },
    publishDate: {
        type: Date,
        //如果没有填写就默认写上当前时间
        default: Date.now
    },
    category: {
        type: String,
        enum: {
            values: ['java', 'css', 'html', 'node'],
            message: '分类名称要在一定的范围内才行'
        }
    },
    author: {
        type: String,
        validate: {
            validator: v => {
                //返回布尔值，v是要验证的信息
                return v && v.length > 4
            },
            //自定义错误信息
            message: '传入的值不符合验证规则'
        }
    }
});
const Post = mongoose.model('Post', postSchema);

Post.create({
        title: 'java',
        age: 22,
        category: 'php',
        author: 'bd'
    })
    .then(result => console.log(result))
    .catch(error => {
        //获取错误信息对象
        const err = error.errors;
        //遍历错误信息对象
        for (var attr in err) {
            console.log(err[attr]['message']);
        }
    });