var express = require('express')
// var ression = require('session')
var path = require('path')
var formidable = require('formidable')
var app = express()
app.use(express.static(path.join(__dirname, 'public')))

// 中间件，拦截所有请求
app.use((req, res, next) => {
  // 允许哪些客户端访问我，*代表所有
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  // 允许客户端使用什么请求方法访问我
  res.header('Access-Control-Allow-Methods', 'get,post')
  // 允许客户端发送跨域请求时携带cookie信息
  res.header('Access-Control-Allow-Credentials', true)
  next()
})

app.get('/test', (req, res) => {
  // const fnName = req.query.callback
  // const data = JSON.stringify({ uname: 'zhangsan', age: '20' })
  // const result = fnName + '(' + data + ')'
  // res.send(result)

  // 这行代码其实就是进行了上面的操作
  res.jsonp({ name: 'zhangsan', age: 20 })
})

app.get('/cross', (req, res) => {
  res.send('ok!')
})

app.post('/login', (req, res) => {
  var form = new formidable.IncomingForm()

  form.parse(req, (err, fields, file) => {
    const { username, password } = fields
    if (username == 'wenhe' && password == '123') {
      // 设置session
      req.session.isLogin = true
      res.send({ message: '登录成功' })
    } else {
      res.send({ message: '登录失败' })
    }
  })
})

app.get('/checkLogin', (req, res) => {
  if (req.session.isLogin) {
    res.send({ message: '处于登录状态' })
  } else {
    res.send({ message: '不处于登录状态' })
  }
})

app.listen(3001)
console.log('服务器开启成功')
