const fs = require('fs');

//创建Promise构造函数的 实例对象
let promise = new Promise((resolve, reject) => {
    fs.readFile('./1.txt', 'utf8', (err, result) => {
        if (err != null) {
            reject(err);
        } else {
            resolve(result);
        }
    });
    // setTimeout(() => {
    //     if (true) {
    //         //resolve是一个函数，当异步api有返回结果的时候，可以去调用resolve函数，
    //         // 并且把异步api执行结果通过参数传递出去
    //         resolve({ name: 'wenhe' });
    //     } else {
    //         //reject也是一个函数，会把失败结果传递到promise外面
    //         reject('失败了');
    //     }
    // }, 2000);
});
promise.then(result => console.log(result))
    .catch(err => console.log(err));