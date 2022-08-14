const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json())

mongoose.connect('mongodb://wenhe:123@localhost:27017/todo', { useNewUrlParser: true })

app.listen(3000)
console.log('服务器开启成功')
