init()

function init() {
  initElemDrag
}

var initElemDrag = (function () {
  var wrap = document.getElementsByClassName('wrap')[0],
    wrapHd = document.getElementsByClassName('wrap-hd')[0]

  elemDrag(wrapHd)
})()

function elemDrag(elem) {
  var elemParent = elem.parentNode,
    x,
    y
  addEvent(elem, 'mousedown', function (e) {
    var e = e || window.event
    x = pagePos(e).X - parseFloat(getStyles(elemParent, 'left'))
    y = pagePos(e).Y - parseFloat(getStyles(elemParent, 'top'))

    addEvent(document, 'mousemove', mouseMove)
    addEvent(document, 'mouseup', mouseUp)
  })
  function mouseMove(e) {
    var e = e || window.event,
      elemParentWidth = parseInt(getStyles(elemParent, 'width')), // 元素自身的宽高
      elemParentHeight = parseInt(getStyles(elemParent, 'height')),
      cWidth = getViewportSize().width, // 可视区域的宽高
      cHeight = getViewportSize().height,
      eLeft = getElemDocPosition(elemParent).left, //元素到body的距离
      eTop = getElemDocPosition(elemParent).top
    if (e.clientX - x <= 0) {
      elemParent.style.left = 0 + 'px'
    } else if (e.clientX - x + elemParentWidth >= cWidth) {
      elemParent.style.left = eLeft + 'px'
    } else {
      elemParent.style.left = e.clientX - x + 'px'
    }
    if (e.clientY - y <= 0) {
      elemParent.style.top = 0 + 'px'
    } else if (e.clientY - y + elemParentHeight >= cHeight) {
      elemParent.style.top = eTop + 'px'
    } else {
      elemParent.style.top = e.clientY - y + 'px'
    }
  }
  function mouseUp(e) {
    var e = e || window.event
    removeEvent(document, 'mousemove', mouseMove)
    removeEvent(document, 'mouseup', mouseUp)
    cancelBubble(e)
    preventDefaultEvent(e)
  }
}
