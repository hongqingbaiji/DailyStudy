window.addEventListener('load', function () {
  var focus = this.document.querySelector('.focus')
  var arrowL = this.document.querySelector('.arrow-l')
  var arrowR = this.document.querySelector('.arrow-r')
  var ul = focus.querySelector('ul')
  var ol = focus.querySelector('ol')
  var focusWidth = focus.offsetWidth
  //鼠标经过/离开focus,显示/隐藏 左右按钮
  focus.addEventListener('mouseenter', function () {
    arrowL.style.display = 'block'
    arrowR.style.display = 'block'
    clearInterval(timer)
    timer = null
  })
  focus.addEventListener('mouseleave', function () {
    arrowL.style.display = 'none'
    arrowR.style.display = 'none'
    clearInterval(timer)
    timer = setInterval(function () {
      arrowR.click()
    }, 2000)
  })
  // 动态生成小圆点
  for (var i = 0; i < ul.children.length; i++) {
    var li = this.document.createElement('li')
    ol.appendChild(li)
    ol.children[i].setAttribute('index', i)

    ol.children[0].className = 'circle'
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
  //克隆第一张图片 放到最后
  var first = ul.children[0].cloneNode(true)
  ul.appendChild(first)
  var num = 0
  var circle = 0
  var flag = true
  arrowL.addEventListener('click', function () {
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
  arrowR.addEventListener('click', function () {
    if (flag) {
      flag = false
      if (num == ul.children.length - 1) {
        num = 0
        ul.style.left = 0
      }
      num++
      circle++
      if (circle == ol.children.length) {
        circle = 0
      }
      animate(ul, -num * focusWidth, function () {
        flag = true
      })

      for (var i = 0; i < ol.children.length; i++) {
        ol.children[i].className = ''
      }
      ol.children[circle].className = 'circle'
    }
  })
  // 定时器
  var timer = this.setInterval(function () {
    arrowR.click()
  }, 2000)
})
