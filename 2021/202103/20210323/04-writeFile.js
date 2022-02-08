const fs = require('fs');
const content = '<h3>正在使用fs.writeFile写入文件内容</h3>';
// ./error.txt 是要写入的文件，如果没有这个文件会自动创建，
//content是要写入的内容
fs.writeFile('./error.txt', content, err => {
    if (err != null) { //err不为空，则表示出错了
        console.log(err);
        return;
    }
    console.log('文件写入成功');
});