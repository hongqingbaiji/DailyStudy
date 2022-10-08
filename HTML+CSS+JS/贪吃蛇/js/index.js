window.onload = function () {
  init()
}

function init() {
  initGame()
}

var initGame = function () {
  var wrap = document.getElementsByClassName('wrap')[0],
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
    this.dir = 'DOWN'
  }

  Snake.prototype = {
    init: function () {
      this.bindEvent()
      this.initSnake()
      this.run()
    },
    bindEvent: function () {
      var _self = this
      addEvent(document, 'keydown', function () {
        _self.changeDir()
      })
    },
    initSnake: function () {
      var frag = document.createDocumentFragment(),
        arr = this.bodyArr,
        Len = arr.length,
        item

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

    run: function () {
      var _self = this
      timer = setInterval(function () {
        _self.move()
      }, 500)
    },

    move: function () {
      var arr = this.bodyArr,
        Len = arr.length,
        head = arr[Len - 1]

      for (var i = 0; i < Len; i++) {
        if (i === Len - 1) {
          switch (this.dir) {
            case 'LEFT':
              head.x -= 20
              break
            case 'RIGHT':
              head.x += 20
              break
            case 'UP':
              head.y -= 20
              break
            case 'DOWN':
              head.y += 20
              break
            default:
              break
          }
        } else {
          arr[i].x = arr[i + 1].x
          arr[i].y = arr[i + 1].y
        }
      }

      this.removeSnake()
      this.initSnake()
    },

    removeSnake: function () {
      var bodys = document.getElementsByClassName('round')

      while (bodys.length > 0) {
        bodys[0].remove()
      }
    },

    changeDir: function (e) {
      var e = e || window.event,
        code = e.keyCode

      this.setDir(code)
    },

    setDir: function (code) {
      switch (code) {
        case 37:
          if (this.dir !== 'RIGHT' && this.dir !== 'LEFT') {
            this.dir = 'LEFT'
          }
          break
        case 39:
          if (this.dir !== 'RIGHT' && this.dir !== 'LEFT') {
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
    }
  }
  return new Snake().init()
}
