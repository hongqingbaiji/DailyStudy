// 引入express框架
const express = require('express')
// 引入路径处理模块
const path = require('path')
const bodyParser = require('body-parser')
const fs = require('fs')
// 创建web服务器
const app = express()

// app.use(bodyParser.urlencoded()) //对应02-  post,x-www-form-urlencoded要用的方法
app.use(bodyParser.json()) //json 请求的方法

// 静态资源访问服务器功能
app.use(express.static(path.join(__dirname, 'public')))

// 对应 01-
app.get('/get', (req, res) => {
  res.send(req.query)
})

// 对应 02-
app.post('/post', (req, res) => {
  res.send(req.body)
})

// 对应 03-
app.post('/json', (req, res) => {
  res.send(req.body)
})

// 对应 04-
app.get('/readystate', (req, res) => {
  res.send('hello')
})

// 对应 05-
app.get('/cache', (req, res) => {
  fs.readFile('./public/test.txt', (err, result) => {
    res.send(result)
  })
})

// 对应 06-
app.get('/first', (req, res) => {
  res.send('Hello Ajax!')
})

// 监听端口
app.listen(3000)

console.log('服务器启动成功')
