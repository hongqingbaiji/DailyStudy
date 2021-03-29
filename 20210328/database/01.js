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
        required: true
    }
});
const Post = mongoose.model('Post', postSchema);

Post.create({
        title: 'js'
    })
    .then(result => console.log(result))
    .catch(err => console.log(err));