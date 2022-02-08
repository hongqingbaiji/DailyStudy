//1、在普通函数定义的前面加上async关键字，普通函数就变成了异步函数
// async function fn(a, b) {
//     throw '错误'; //抛出错误；不执行return了
//     return a + b;
// }
// fn(1, 2).then(data => console.log(data))
//     .catch(err => console.log(err));

async function p1() {
    return 'p1';
}
async function p2() {
    return 'p2';
}
async function p3() {
    return 'p3';
}

async function run() {
    let r1 = await p1();
    let r2 = await p2();
    let r3 = await p3();
    console.log(r1);
    console.log(r2);
    console.log(r3);
}
run();