const mongoose = require('mongoose');
//连接数据库
mongoose.connect('mongodb://localhost/blog', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('数据库连接成功'))
    .catch(() => console.log('数据库连接失败'));