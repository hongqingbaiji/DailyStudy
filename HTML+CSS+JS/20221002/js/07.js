window.onload = function () {
  init()
}

function init() {
  initMenu()
}

var initMenu = function () {
  var oMenu = document.getElementsByClassName('menu-wrap')[0],
    oMainItems = oMenu.getElementsByClassName('main-item'),
    oSub = oMenu.getElementsByClassName('sub')[0],
    oSubItems = oSub.getElementsByClassName('sub-item'),
    menuLen = oMainItems.length,
    menuItem,
    subLen = oSubItems.length,
    subItem,
    isInSub = false,
    timer = null,
    mousePoses = [],
    isFirst = true

  for (var i = 0; i < menuLen; i++) {
    menuItem = oMainItems[i]
    addEvent(menuItem, 'mouseenter', menuItemMouseEnter)
  }
  addEvent(oSub, 'mouseenter', function () {
    isInSub = true
  })
  addEvent(oSub, 'mouseleave', function () {
    isInSub = false
  })
  addEvent(oMenu, 'mouseenter', function () {
    addEvent(document, 'mousemove', mouseMove)
  })
  addEvent(oMenu, 'mouseleave', menuMouseLeave)

  function menuItemMouseEnter(e) {
    var e = e || window.event,
      tar = e.target || e.srcElement,
      thisIdx = Array.prototype.indexOf.call(oMainItems, tar),
      lastPos = mousePoses[mousePoses.length - 2] || { x: 0, y: 0 },
      curPos = mousePoses[mousePoses.length - 1] || { x: 0, y: 0 },
      toDelay = doTimeOut(lastPos, curPos)

    oSub.className = 'sub'

    if (timer) {
      clearTimeout(timer)
    }

    if (!isFirst) {
      if (toDelay) {
        timer = setTimeout(function () {
          if (isInSub) {
            return
          }

          addActive(thisIdx)
          timer = null
        }, 300)
      } else {
        timer = setTimeout(function () {
          if (isInSub) {
            return
          }
          addActive(thisIdx)
          timer = null
        }, 100)
      }
    } else {
      timer = setTimeout(function () {
        if (isInSub) {
          return
        }
        addActive(thisIdx)
        timer = null
      }, 100)
      isFirst = false
    }
  }

  function mouseMove(e) {
    var e = e || window.event

    mousePoses.push({
      x: pagePos(e).X,
      y: pagePos(e).Y
    })

    if (mousePoses.length > 3) {
      mousePoses.shift()
    }
  }

  function menuMouseLeave() {
    oSub.className += ' hide'
    removeAllActive()
    removeEvent(document, 'mousemove', mouseMove)
  }

  // 给当前项添加active类的 函数
  function addActive(index) {
    removeAllActive()
    oMainItems[index].className += ' active'
    oSubItems[index].className += ' active'
  }

  // 移除所有项的active类的 函数
  function removeAllActive() {
    for (var i = 0; i < menuLen; i++) {
      menuItem = oMainItems[i]
      menuItem.className = 'main-item'
    }
    for (var i = 0; i < subLen; i++) {
      subItem = oSubItems[i]
      subItem.className = 'sub-item'
    }
  }

  // 获取三角形中的 b 和 c点，p和a点直接传进来，
  function doTimeOut(lastPos, curPos) {
    var topLeft = {
      x: getStyles(oMenu, 'width') + getStyles(oMenu, 'margin-left'),
      y: getStyles(oMenu, 'margin-top')
    }
    var bottomLeft = {
      x: getStyles(oMenu, 'width') + getStyles(oMenu, 'left'),
      y: getStyles(oMenu, 'margin-top') + getStyles(oSub, 'height')
    }

    return pointInTriangle(curPos, lastPos, topLeft, bottomLeft)
  }
}
