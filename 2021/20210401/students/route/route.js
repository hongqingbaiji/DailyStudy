//实现路由

//引入模板引擎
const template = require('art-template');
// 引入querystring模块
const querystring = require('querystring');
//引入router模块
const getRouter = require('router');
//获取路由对象
const router = getRouter();
//导入Stu模块
const Stu = require('../model/stu');

//呈递添加学生档案信息页面
router.get('/add', (req, res) => {
    let html = template('index.art', {});
    res.end(html);
});
//呈递学生档案列表页面
router.get('/list', async(req, res) => {
    // 查询学生信息
    let stus = await Stu.find();
    let html = template('list.art', {
        stus: stus,
    });
    res.end(html);
});
//实现学生信息添加功能路由
router.post('/add', (req, res) => {
    //接收post请求参数
    let formDate = '';
    req.on('data', param => {
        formDate += param;
    });
    req.on('end', async() => {
        await Stu.create(querystring.parse(formDate));
        //重定向
        res.writeHead(301, {
            'Location': '/list'
        });
        res.end('添加成功');
    });
});
// 导出router
module.exports = router;