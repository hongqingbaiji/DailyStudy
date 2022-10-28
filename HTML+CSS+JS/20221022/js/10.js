window.onload = function () {
  init()
}

function init() {
  initCollisionMove()
}

var initCollisionMove = function () {
  var oBtn = document.getElementsByTagName('button')[0],
    oDiv = document.getElementsByTagName('div')[0]

  addEvent(oBtn, 'click', function () {
    collisionMove({
      obj: oDiv
    })
  })

  elemDrag(oDiv)

  function collisionMove(json) {
    var obj = json.obj,
      curX = parseInt(getStyles(obj, 'left')),
      curY = parseInt(getStyles(obj, 'top')),
      width = parseInt(getStyles(obj, 'width')),
      height = parseInt(getStyles(obj, 'height')),
      activeWidth = json.activeWidth,
      activeHeight = json.activeHeight,
      stepX = json.stepX,
      stepY = json.stepY,
      left,
      top

    activeWidth = Number(activeWidth) || getViewportSize().width
    activeHeight = Number(activeHeight) || getViewportSize().height
    stepX = isNaN(Number(stepX)) ? 5 : Number(stepX)
    stepY = isNaN(Number(stepY)) ? 5 : Number(stepY)

    //
    // if (obj.timer) {
    //   return
    // }

    obj.timer = setInterval(function () {
      curX = parseInt(getStyles(obj, 'left'))
      curY = parseInt(getStyles(obj, 'top'))

      left = curX + stepX
      top = curY + stepY

      if (left > activeWidth - width) {
        left = activeWidth - width
      }
      if (left === activeWidth - width || left <= 0) {
        stepX = -stepX
      }
      if (top > activeHeight - height) {
        top = activeHeight - height
      }
      if (top === activeHeight - height || top <= 0) {
        stepY = -stepY
      }

      obj.style.left = left + 'px'
      obj.style.top = top + 'px'
    }, 30)
  }

  function elemDrag(elem) {
    var x,
      y,
      stepX,
      stepY,
      lastX = 0,
      lastY = 0

    addEvent(elem, 'mousedown', function (e) {
      var e = e || window.event

      clearInterval(elem.timer)

      x = pagePos(e).X - getStyles(elem, 'left')
      y = pagePos(e).Y - getStyles(elem, 'top')

      addEvent(document, 'mousemove', mouseMove)
      addEvent(document, 'mouseup', mouseUp)
    })
    function mouseMove(e) {
      var e = e || window.event,
        // 当前elem 左上角的left值 和top值
        newLeft = pagePos(e).X - x,
        newTop = pagePos(e).Y - y

      // 通过当前位置和上个位置的坐标差值来设置步长，可以设置鼠标抬起后的速度和方向
      stepX = newLeft - lastX
      stepY = newTop - lastY
      lastX = newLeft
      lastY = newTop

      elem.style.left = newLeft + 'px'
      elem.style.top = newTop + 'px'
    }
    function mouseUp(e) {
      var e = e || window.event
      removeEvent(document, 'mousemove', mouseMove)
      removeEvent(document, 'mouseup', mouseUp)

      // 鼠标抬起，以新的步长值调用碰撞运动函数
      collisionMove({
        obj: elem,
        stepX: stepX * 5,
        stepY: stepY * 5
      })

      cancelBubble(e)
      preventDefaultEvent(e)
    }
  }
}
