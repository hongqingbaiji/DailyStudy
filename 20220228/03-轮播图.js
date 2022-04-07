window.addEventListener('load', function () {
  var focus = document.querySelector('.focus')
  var ul = document.querySelector('ul')
  var ol = document.querySelector('ol')
  var arrow_l = document.querySelector('.arrow-l')
  var arrow_r = document.querySelector('.arrow-r')
  // 1、鼠标经过/离开focus，显示/隐藏左右箭头
  focus.addEventListener('mouseenter', function () {
    arrow_l.style.display = 'block'
    arrow_r.style.display = 'block'
    clearInterval(timer)
    timer = null
  })
  focus.addEventListener('mouseleave', function () {
    arrow_l.style.display = 'none'
    arrow_r.style.display = 'none'
    // clearInterval(timer)
    timer = setInterval(function () {
      arrow_r.click()
    }, 2000)
  })
  // 2、动态生成小圆圈
  for (var i = 0; i < ul.children.length; i++) {
    var li = document.createElement('li')
    ol.appendChild(li)
    ol.children[i].setAttribute('index', i)
  }
  // 利用排他思想，点击哪个小圆圈，就给他加上className
  for (var i = 0; i < ol.children.length; i++) {
    ol.children[0].className = 'circle'
    ol.children[i].addEventListener('click', function () {
      for (var i = 0; i < ol.children.length; i++) {
        ol.children[i].className = ''
      }
      this.className = 'circle'
      // 3、点击小圆圈后，移动轮播图，本质是调用animate函数,特别注意动画函数需要有定位
      var index = this.getAttribute('index')
      num = index
      circle = index
      animate(ul, -index * focus.offsetWidth)
    })
  }
  var num = 0
  var circle = 0
  var flag = true //添加节流阀
  // 克隆第一张图片，加到最后面
  var clonefirst = ul.children[0].cloneNode(true)
  ul.appendChild(clonefirst)
  // 4、点击右侧按钮，滚动轮播图
  arrow_r.addEventListener('click', function () {
    if (flag) {
      flag = false
      if (num == ul.children.length - 1) {
        num = 0
        ul.style.left = 0
      }
      num++
      animate(ul, -num * focus.offsetWidth, function () {
        flag = true
      })
      circle++
      if (circle == ol.children.length) {
        circle = 0
      }
      for (var i = 0; i < ol.children.length; i++) {
        ol.children[i].className = ''
      }
      ol.children[circle].className = 'circle'
    }
  })
  // 5、点击左侧按钮，滚动轮播图
  arrow_l.addEventListener('click', function () {
    if (flag) {
      flag = false
      if (num == 0) {
        num = ul.children.length - 1
        ul.style.left = -num * focus.offsetWidth + 'px'
      }
      num--
      animate(ul, -num * focus.offsetWidth, function () {
        flag = true
      })
      if (circle == 0) {
        circle = ol.children.length
      }
      circle--
      for (var i = 0; i < ol.children.length; i++) {
        ol.children[i].className = ''
      }
      ol.children[circle].className = 'circle'
    }
  })
  //6、自动播放功能
  var timer = setInterval(function () {
    arrow_r.click()
  }, 2000)
})
