const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, '01-node.js'), 'utf8', (err, doc) => {
    console.log(err);
    console.log(doc);
});