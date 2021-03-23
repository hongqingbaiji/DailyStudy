const fs = require('fs');
fs.readFile('./01-node.js', 'utf8', (err, doc) => {
    console.log(err); //null
    console.log(doc); // 输出01-node.js 里的内容
});