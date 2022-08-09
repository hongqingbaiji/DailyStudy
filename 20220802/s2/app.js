var express = require('express')
var path = require('path')

var app = express()
app.use(express.static(path.join(__dirname, 'public')))

// 中间件，拦截所有请求
app.use((req, res, next) => {
  // 允许哪些客户端访问我，*代表所有
  res.header('Access-Control-Allow-Origin', '*')
  // 允许客户端使用什么请求方法访问我
  res.header('Access-Control-Allow-Methods', 'get,post')
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

app.listen(3001)
console.log('服务器开启成功')
