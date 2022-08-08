var express = require('express')
var path = require('path')

var app = express()
app.use(express.static(path.join(__dirname, 'public')))

app.get('/test', (req, res) => {
  // const fnName = req.query.callback
  // const data = JSON.stringify({ uname: 'zhangsan', age: '20' })
  // const result = fnName + '(' + data + ')'
  // res.send(result)

  // 这行代码其实就是进行了上面的操作
  res.jsonp({ name: 'zhangsan', age: 20 })
})

app.listen(3001)
console.log('服务器开启成功')
