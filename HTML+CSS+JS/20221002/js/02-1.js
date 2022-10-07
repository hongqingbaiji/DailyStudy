//  需求
//  1. 鼠标按下和抬起的时间间隔小于等于200ms,就触发点击事件
//  2. 大于200ms，就触发拖拽事件
//  3. 拖拽不能出可视区域
//  4. 禁用原生右键菜单，点击右键，弹出自己的右键菜单
//  5. 右键菜单的位置不能出可视区域
//  6. 两次点击之间时间间隔小于500ms 触发双击事件，大于则算单击

Element.prototype.dragNclick = function (menu, elemClick) {
  var cWidth = getViewportSize().width, //可视区域的宽高
    cHeight = getViewportSize().height,
    elemWidth = getStyles(this, 'width'), // 目标元素的宽高
    elemHeight = getStyles(this, 'height'),
    menuWidth = getStyles(menu, 'width'), // 右键菜单元素的宽高
    menuHeight = getStyles(menu, 'height'),
    bTime = 0,
    eTime = 0,
    ePos = [],
    content,
    cbTime = 0,
    ceTime = 0,
    timer = null

  drag.call(this)

  function drag() {
    var x,
      y,
      _self = this

    addEvent(this, 'mousedown', function (e) {
      var e = e || window.event,
        btnCode = e.button,
        mouseLeft = pagePos(e).X,
        mouseTop = pagePos(e).Y,
        elemLeft = getStyles(_self, 'left'),
        elemTop = getStyles(_self, 'top')

      if (btnCode === 0) {
        bTime = new Date().getTime()
        ePos = [elemLeft, elemTop]

        menu.style.display = 'none'

        x = mouseLeft - elemLeft
        y = mouseTop - elemTop
        addEvent(document, 'mousemove', mouseMove)
        addEvent(document, 'mouseup', mouseUp)
      } else if (btnCode === 2) {
        // 不让右键菜单出框
        if (mouseLeft <= 0) {
          mouseLeft = 0
        } else if (mouseLeft >= cWidth - menuWidth) {
          mouseLeft -= menuWidth
        }
        if (mouseTop <= 0) {
          mouseTop = 0
        } else if (mouseTop >= cHeight - menuHeight) {
          mouseTop -= menuHeight
        }
        menu.style.left = mouseLeft + 'px'
        menu.style.top = mouseTop + 'px'
        menu.style.display = 'block'
      }

      cancelBubble(e)
      preventDefaultEvent(e)
    })

    function mouseMove(e) {
      var e = e || window.event,
        elemLeft = pagePos(e).X - x,
        elemTop = pagePos(e).Y - y

      // 不让元素移动出框
      if (elemLeft <= 0) {
        elemLeft = 0
      } else if (elemLeft >= cWidth - elemWidth) {
        elemLeft = cWidth - elemWidth
      }
      if (elemTop <= 0) {
        elemTop = 0
      } else if (elemTop >= cHeight - elemHeight) {
        elemTop = cHeight - elemHeight
      }

      _self.style.left = elemLeft + 'px'
      _self.style.top = elemTop + 'px'
    }
    function mouseUp(e) {
      var e = e || window.event
      eTime = new Date().getTime()
      if (eTime - bTime <= 200) {
        _self.style.left = ePos[0] + 'px'
        _self.style.top = ePos[1] + 'px'

        content++
        if (content === 1) {
          cbTime = new Date().getTime()
        }
        if (content === 2) {
          ceTime = new Date().getTime()
        }
        if (cbTime && ceTime && ceTime - cbTime <= 500) {
          elemClick()
        }

        timer = setTimeout(function () {
          cbTime = 0
          ceTime = 0
          content = 0
          clearTimeout(timer)
        }, 500)
      }
      removeEvent(document, 'mousemove', mouseMove)
      removeEvent(document, 'mouseup', mouseUp)
    }

    // 禁用原生右键菜单
    addEvent(document, 'contextmenu', function (e) {
      var e = e || window.event
      preventDefaultEvent(e)
    })
    // 点击文档其他位置，让右键菜单隐藏
    addEvent(document, 'click', function (e) {
      var e = e || window.event
      menu.style.display = 'none'
    })
    // 取消右键菜单的冒泡事件
    addEvent(menu, 'click', function (e) {
      var e = e || window.event
      cancelBubble(e)
    })
  }
}
