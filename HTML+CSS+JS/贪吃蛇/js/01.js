window.onload = function () {
  init()
}

function init() {
  initGame()
}

var initGame = function () {
  var wrap = document.getElementsByClassName('wrap')[0],
    wrapW = getStyles(wrap, 'width'),
    wrapH = getStyles(wrap, 'height'),
    timer = null

  var Snake = function () {
    this.bodyArr = [
      { x: 0, y: 0 },
      { x: 0, y: 20 },
      { x: 0, y: 40 },
      { x: 0, y: 60 },
      { x: 0, y: 80 },
      { x: 0, y: 100 }
    ]
  }

  Snake.prototype = {
    init: function () {
      this.initSnake()
      this.createFood()
      this.run()
      this.bindEvent()
    },

    // 创建蛇的身体
    initSnake: function () {
      var arr = this.bodyArr,
        Len = arr.length,
        item,
        frag = document.createDocumentFragment()

      for (var i = 0; i < Len; i++) {
        item = arr[i]
        var round = document.createElement('i')
        round.className = i === Len - 1 ? 'round head' : 'round'
        round.style.left = item.x + 'px'
        round.style.top = item.y + 'px'
        frag.appendChild(round)
      }
      wrap.appendChild(frag)
    },

    // 绑定事件函数
    bindEvent: function () {
      var _self = this
      this.dir = 'DOWN'
      addEvent(document, 'keydown', function () {
        _self.changeDir()
      })
    },

    // 利用定时器让蛇跑起来
    run: function () {
      var _self = this
      timer = setInterval(function () {
        _self.move()
      }, 200)
    },

    // 移动蛇的位置
    move: function () {
      var arr = this.bodyArr,
        Len = arr.length

      for (var i = 0; i < Len; i++) {
        if (i === Len - 1) {
          this.setHeadXY(arr)
        } else {
          arr[i].x = arr[i + 1].x
          arr[i].y = arr[i + 1].y
        }
      }
      this.eatFood(arr)
      this.removeSnake()
      this.initSnake()
      this.headInBody()
    },

    // 设置移动后蛇头部的坐标
    setHeadXY: function (arr) {
      var head = arr[arr.length - 1]

      switch (this.dir) {
        case 'LEFT':
          head.x = head.x <= 0 ? wrapW - 20 : head.x - 20
          break
        case 'RIGHT':
          head.x = head.x >= wrapW - 20 ? 0 : head.x + 20
          break
        case 'UP':
          head.y = head.y <= 0 ? wrapH - 20 : head.y - 20
          break
        case 'DOWN':
          head.y = head.y >= wrapH - 20 ? 0 : head.y + 20
          break
        default:
          break
      }
    },

    // 移除蛇
    removeSnake: function () {
      var bodys = document.getElementsByClassName('round')
      while (bodys.length > 0) {
        bodys[0].remove()
      }
    },

    // 更改方向
    changeDir: function (e) {
      var e = e || window.event,
        code = e.keyCode

      this.setDir(code)
    },

    // 设置方向
    setDir: function (code) {
      switch (code) {
        case 37:
          if (this.dir !== 'LEFT' && this.dir !== 'RIGHT') {
            this.dir = 'LEFT'
          }
          break
        case 39:
          if (this.dir !== 'LEFT' && this.dir !== 'RIGHT') {
            this.dir = 'RIGHT'
          }
          break
        case 38:
          if (this.dir !== 'UP' && this.dir !== 'DOWN') {
            this.dir = 'UP'
          }
          break
        case 40:
          if (this.dir !== 'UP' && this.dir !== 'DOWN') {
            this.dir = 'DOWN'
          }
          break
        default:
          break
      }
    },

    // 创建食物
    createFood: function () {
      var food = document.createElement('i')
      food.className = 'food'
      food.style.left = this.setRandomPos(wrapW) * 20 + 'px'
      food.style.top = this.setRandomPos(wrapH) * 20 + 'px'
      wrap.appendChild(food)
    },

    // 随机生成食物坐标
    setRandomPos: function (size) {
      return Math.floor(Math.random() * (size / 20))
    },

    // 吃掉食物
    eatFood: function (arr) {
      var food = document.getElementsByClassName('food')[0],
        foodX = getStyles(food, 'left'),
        foodY = getStyles(food, 'top'),
        headX = arr[arr.length - 1].x,
        headY = arr[arr.length - 1].y,
        x,
        y

      if (headX === foodX && headY === foodY) {
        this.removeFood()
        this.createFood()
        if (arr[0].x === arr[1].x) {
          if (arr[0].y > arr[1].y) {
            x = arr[0].x
            y = arr[0].y + 20
          } else if (arr[0].y < arr[1].y) {
            x = arr[0].x
            y = arr[0].y - 20
          }
        } else if (arr[0].y === arr[1].y) {
          if (arr[0].x > arr[1].x) {
            x = arr[0].x + 20
            y = arr[0].y
          } else if (arr[0].x < arr[1].x) {
            x = arr[0].x - 20
            y = arr[0].y
          }
        }
        arr.unshift({ x, y })
      }
    },

    // 删除食物
    removeFood: function () {
      var food = document.getElementsByClassName('food')[0]
      food.remove()
    },

    // 结束游戏
    headInBody: function () {
      var arr = this.bodyArr,
        Len = arr.length,
        headX = arr[Len - 1].x,
        headY = arr[Len - 1].y,
        item

      for (var i = 0; i < Len - 2; i++) {
        item = arr[i]
        if (headX === item.x && headY === item.y) {
          var _self = this
          setTimeout(function () {
            alert('游戏结束')
            _self.removeSnake()
            _self.removeFood()
          }, 100)
        }
      }
    }
  }

  return new Snake().init()
}
