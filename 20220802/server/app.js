// 引入express框架
const express = require('express')
// 引入路径处理模块
const path = require('path')
const template = require('art-template')
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
  res.send('ok')
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

// 对应 08-
app.get('/verifyEmailAdress', (req, res) => {
  const email = req.query.email
  var list = ['admin@163.com', 'wenhe@163.com']
  var result = list.filter(item => item.includes(email))
  if (email == result) {
    res.status(400).send({
      message: '邮箱地址已注册，请更换邮箱地址'
    })
  } else {
    res.send({
      message: '邮箱地址可用'
    })
  }
})

// 对应 09-
app.get('/search', (req, res) => {
  var key = req.query.key
  var list = [
    '黑马',
    '黑马程序员',
    '黑马教师',
    '黑马传智播客',
    '高考黑马',
    '苹果手机',
    '苹果官网',
    '苹果有毒',
    '苹果12pro',
    '华为手机',
    '华为官网',
    '华为p40',
    '华为是黑马吗',
    '华为手机价格'
  ]
  var result = list.filter(item => item.includes(key))
  res.send(result)
})

// 对应 10-
app.get('/province', (req, res) => {
  res.json([
    {
      id: '001',
      name: '黑龙江省'
    },
    {
      id: '002',
      name: '四川省'
    },
    {
      id: '003',
      name: '河北省'
    },
    {
      id: '004',
      name: '江苏省'
    }
  ])
})
app.get('/cities', (req, res) => {
  var id = req.query.id
  var cities = {
    '001': [
      {
        id: '300',
        name: '哈尔滨市'
      },
      {
        id: '301',
        name: '齐齐哈尔市'
      },
      {
        id: '302',
        name: '河北省'
      },
      {
        id: '303',
        name: '佳木斯市'
      }
    ],
    '002': [
      {
        id: '400',
        name: '成都市'
      },
      {
        id: '401',
        name: '绵阳市'
      },
      {
        id: '402',
        name: '德阳市'
      },
      {
        id: '403',
        name: '攀枝花市'
      }
    ],
    '003': [
      {
        id: '500',
        name: '石家庄市'
      },
      {
        id: '501',
        name: '唐山市'
      },
      {
        id: '502',
        name: '秦皇岛市'
      },
      {
        id: '503',
        name: '邯郸市'
      }
    ],
    '004': [
      {
        id: '600',
        name: '常州市'
      },
      {
        id: '601',
        name: '徐州市'
      },
      {
        id: '602',
        name: '南京市'
      },
      {
        id: '603',
        name: '淮安市'
      }
    ]
  }
  res.send(cities[id] || [])
})
app.get('/areas', (req, res) => {
  var id = req.query.id
  var areas = {
    300: [
      {
        id: '20',
        name: '道里区'
      },
      {
        id: '21',
        name: '南岗区'
      },
      {
        id: '22',
        name: '平房区'
      },
      {
        id: '23',
        name: '松北区'
      }
    ],
    301: [
      {
        id: '30',
        name: '龙沙区'
      },
      {
        id: '31',
        name: '铁锋区'
      },
      {
        id: '32',
        name: '富拉尔基区'
      }
    ],
    302: [
      {
        id: '40',
        name: '石家庄市'
      },
      {
        id: '41',
        name: '唐山市'
      },
      {
        id: '42',
        name: '秦皇岛市'
      },
      {
        id: '43',
        name: '邯郸市'
      }
    ],
    303: [
      {
        id: '50',
        name: '常州市'
      },
      {
        id: '51',
        name: '徐州市'
      },
      {
        id: '52',
        name: '南京市'
      },
      {
        id: '53',
        name: '淮安市'
      }
    ]
  }
  res.send(areas[id] || [])
})

// 监听端口
app.listen(3000)

console.log('服务器启动成功')
