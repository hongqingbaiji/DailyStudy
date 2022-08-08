const express = require('express')
const path = require('path')
const formidable = require('formidable')
// const fs = require('fs')

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

app.listen(3000)
console.log('服务器开启成功')
