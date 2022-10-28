function gravityMove(json) {
  var obj = json.obj,
    curY = parseInt(getStyles(obj, 'top')),
    curX = parseInt(getStyles(obj, 'left')),
    height = parseInt(getStyles(obj, 'height')),
    width = parseInt(getStyles(obj, 'width')),
    activeHeight = json.activeHeight,
    activeWidth = json.activeWidth,
    stepY = 0,
    stepX = 5,
    top,
    left,
    k = 0.9, // 减速系数
    i = 0 // 声明一个碰撞次数

  activeHeight = Number(json.activeHeight) || getViewportSize().height
  activeWidth = Number(json.activeWidth) || getViewportSize().width

  if (obj.timer) {
    return
  }

  obj.timer = setInterval(function () {
    curY = parseInt(getStyles(obj, 'top'))
    curX = parseInt(getStyles(obj, 'left'))
    stepY += 5
    top = curY + stepY
    left = curX + stepX

    if (top > activeHeight - height) {
      top = activeHeight - height
    }
    if (left > activeWidth - width) {
      left = activeWidth - width
    }

    if (top === activeHeight - height) {
      i++
      stepY = -stepY * k

      if (i === 20) {
        clearInterval(obj.timer)
        obj.timer = null
      }
    }
    if (left === activeWidth - width) {
      i++
      stepX = -stepX * k

      if (i === 20) {
        clearInterval(obj.timer)
        obj.timer = null
      }
    }
    obj.style.top = top + 'px'
    obj.style.left = left + 'px'
  }, 50)
}
