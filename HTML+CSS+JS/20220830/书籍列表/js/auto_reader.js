//自动阅读插件
;(function () {
  var wHeight = getViewportSize().height,
    sHeight = getScrollSize().height,
    playing = false,
    timer = null

  var AutoReader = function (opt) {
    var _self = this
    this.playBtn = opt.playBtn
    addEvent(this.playBtn, 'click', function () {
      _self.setAutoReader.call(this)
    })
  }
  AutoReader.prototype = {
    setAutoReader: function () {
      var _self = this,
        sTop = getScrollOffset().top
      playing = !playing
      if (playing) {
        timer = setInterval(function () {
          sTop = getScrollOffset().top
          if (sHeight === wHeight + sTop - 44) {
            playing = !playing
            clearInterval(timer)
            _self.style.innerHTML = '开始滚动'
            _self.style.backgroundColor = 'green'
            return
          } else {
            _self.style.innerHTML = '暂停滚动'
            _self.style.backgroundColor = 'orange'
            window.scrollBy(0, 1)
          }
        }, 30)
      } else {
        clearInterval(timer)
        _self.style.innerHTML = '开始滚动'
        _self.style.backgroundColor = 'green'
      }
    }
  }

  window.AutoReader = AutoReader
})()
