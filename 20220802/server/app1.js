const express = require('express')
const path = require('path')
const formidable = require('formidable')
// 向其他服务器端请求数据的模块
const request = require('request')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

// 对应01-
app.post('/formData', (req, res) => {
  // 创建formidable表单解析对象
  const form = new formidable.IncomingForm()
  // 解析客户端传递过来的FormData对象
  form.parse(req, (err, fields, files) => {
    res.send(fields)
  })
})

// 对应02-
app.post('/upload', (req, res) => {
  // res.send('ok')
  const form = new formidable.IncomingForm({
    multiples: true,
    uploadDir: path.join(__dirname, 'public', 'uploads'),
    keepExtensions: true
  })
  form.parse(req, (err, fields, files) => {
    res.send({
      path: files.attrName.filepath.split('public')[1]
    })
  })
})

// 对应 07-
app.get('/sever', (req, res) => {
  request('http://localhost:3001/cross', (err, response, body) => {
    // console.log('error: ', err)
    // console.log('response: ', response)
    // console.log('body: ', body)
    res.send(body)
  })
})

// 对应09-
app.get('/jsonp', (req, res) => {
  res.jsonp({
    username: 'lisi',
    age: 30
  })
})

app.listen(3000)
console.log('服务器开启成功')
