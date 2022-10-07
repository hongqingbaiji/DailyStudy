//  需求
//  1. 鼠标按下和抬起的时间间隔小于等于100ms,就触发点击事件
//  2. 大于100ms，就触发拖拽事件
//  3. 拖拽不能出可视区域
//  4. 禁用原生右键菜单，点击右键，弹出自己的右键菜单
//  5. 右键菜单的位置不能出可视区域
//  6. 两次点击之间时间间隔小于300ms 触发双击事件，大于则算单击

Element.prototype.dragNclick = function (menu, elemClick) {
  var cWidth = getViewportSize().width, // 可视区域的宽高
    cHeight = getViewportSize().height,
    eWidth = getStyles(this, 'width'), // 元素elem的宽高
    eHeight = getStyles(this, 'height'),
    menuWidth = getStyles(menu, 'width'), // 右键菜单的宽高
    menuHeight = getStyles(menu, 'height'),
    ePos = [],
    bTime = 0,
    eTime = 0,
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
        btnCode = e.button

      // btnCode等于0时代表按下的左键，等于2代表按下的右键
      if (btnCode === 0) {
        bTime = new Date().getTime()
        ePos = [getStyles(_self, 'left'), getStyles(_self, 'top')]

        menu.style.display = 'none'

        x = pagePos(e).X - getStyles(_self, 'left')
        y = pagePos(e).Y - getStyles(_self, 'top')
        addEvent(document, 'mousemove', mouseMove)
        addEvent(document, 'mouseup', mouseUp)
      } else if (btnCode === 2) {
        var menuLeft = pagePos(e).X,
          menuTop = pagePos(e).Y
        // 右键菜单不能出框
        if (menuLeft <= 0) {
          menuLeft = 0
        } else if (menuLeft >= cWidth - menuWidth) {
          menuLeft -= menuWidth
        }
        if (menuTop <= 0) {
          menuTop = 0
        } else if (menuTop >= cHeight - menuHeight) {
          menuTop -= menuHeight
        }
        menu.style.left = menuLeft + 'px'
        menu.style.top = menuTop + 'px'
        menu.style.display = 'block'
      }
      cancelBubble(e)
      preventDefaultEvent(e)
    })

    function mouseMove(e) {
      var e = e || window.event,
        eLeft = pagePos(e).X - x,
        eTop = pagePos(e).Y - y

      // 不让元素移动出框
      if (eLeft <= 0) {
        eLeft = 0
      } else if (eLeft >= cWidth - eWidth) {
        eLeft = cWidth - eWidth
      }
      if (eTop <= 0) {
        eTop = 0
      } else if (eTop >= cHeight - eHeight) {
        eTop = cHeight - eHeight
      }
      _self.style.left = eLeft + 'px'
      _self.style.top = eTop + 'px'
    }

    function mouseUp(e) {
      var e = e || window.event
      eTime = new Date().getTime()

      if (eTime - bTime < 200) {
        // 把位置还原
        _self.style.left = ePos[0] + 'px'
        _self.style.top = ePos[1] + 'px'

        content++
        if (content === 1) {
          cbTime = new Date().getTime()
        }
        if (content === 2) {
          ceTime = new Date().getTime()
        }

        if (cbTime && ceTime && ceTime - cbTime < 500) {
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

    addEvent(_self, 'click', function (e) {
      var e = e || window.event
      preventDefaultEvent(e)
    })

    //禁止原生的右键菜单
    addEvent(document, 'contextmenu', function (e) {
      var e = e || window.event
      preventDefaultEvent(e)
    })
    // 点击右键菜单时，取消冒泡，不让菜单隐藏
    addEvent(menu, 'click', function (e) {
      var e = e || window.event
      cancelBubble(e)
    })
    // 点击文档，把右键菜单隐藏了
    addEvent(document, 'click', function (e) {
      var e = e || window.event
      menu.style.display = 'none'
    })
  }
}
