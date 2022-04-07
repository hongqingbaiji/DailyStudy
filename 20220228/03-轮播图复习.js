window.addEventListener('load', function () {
  // 获取元素
  var focus = this.document.querySelector('.focus')
  var ul = focus.querySelector('ul')
  var ol = focus.querySelector('ol')
  var arrow_l = this.document.querySelector('.arrow-l')
  var arrow_r = this.document.querySelector('.arrow-r')
  var focusWidth = focus.offsetWidth
  // 实现鼠标经过，把左右按钮展示出来；鼠标离开，左右按钮隐藏
  focus.addEventListener('mouseenter', function () {
    arrow_l.style.display = 'block'
    arrow_r.style.display = 'block'
    clearInterval(timer)
    timer = null
  })
  focus.addEventListener('mouseleave', function () {
    arrow_l.style.display = 'none'
    arrow_r.style.display = 'none'
    // 使用定时器，自动播放轮播图
    clearInterval(timer)
    timer = setInterval(function () {
      arrow_r.click()
    }, 2000)
  })
  // 动态生成小圆点
  for (var i = 0; i < ul.children.length; i++) {
    var li = this.document.createElement('li')
    ol.appendChild(li)
    ol.children[0].className = 'circle'
    ol.children[i].setAttribute('index', i)

    // 排他思想点击切换小圆点,并移动轮播图
    ol.children[i].addEventListener('click', function () {
      for (var i = 0; i < ol.children.length; i++) {
        ol.children[i].className = ''
      }
      this.className = 'circle'
      var index = this.getAttribute('index')
      num = index
      circle = index
      animate(ul, -index * focusWidth)
    })
  }
  // 克隆第一张图片，放到最后
  var first = ul.children[0].cloneNode(true)
  ul.appendChild(first)
  var flag = true // 节流阀
  // 点击左右按钮，移动轮播图
  var num = 0
  var circle = 0
  arrow_r.addEventListener('click', function () {
    if (flag) {
      flag = false
      if (num == ul.children.length - 1) {
        num = 0
        ul.style.left = 0
      }
      num++
      circle++
      animate(ul, -num * focusWidth, function () {
        flag = true
      })
      if (circle == ol.children.length) {
        circle = 0
      }
      for (var i = 0; i < ol.children.length; i++) {
        ol.children[i].className = ''
      }
      ol.children[circle].className = 'circle'
    }
  })
  arrow_l.addEventListener('click', function () {
    if (flag) {
      flag = false
      if (num == 0) {
        num = ul.children.length - 1
        ul.style.left = -num * focusWidth + 'px'
      }
      if (circle == 0) {
        circle = ol.children.length
      }
      num--
      circle--
      animate(ul, -num * focusWidth, function () {
        flag = true
      })

      for (var i = 0; i < ol.children.length; i++) {
        ol.children[i].className = ''
      }
      ol.children[circle].className = 'circle'
    }
  })
  // 使用定时器，自动播放轮播图
  var timer = this.setInterval(function () {
    arrow_r.click()
  }, 2000)
})
