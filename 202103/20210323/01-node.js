const add = (n1, n2) => n1 + n2;
//第一种导出模块成员的方式
exports.add = add;

const getName = name => `Hello ${name}`;
//第二种导出模块成员的方式
module.exports.getName = getName;