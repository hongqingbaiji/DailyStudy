// 封装 绑定事件
function addEvent(el, type, fn) {
  if (el.addEventListener) {
    el.addEventListener(type, fn, false)
  } else if (el.attachEvent) {
    el.attachEvent('on' + type, function () {
      fn.call(el)
    })
  } else {
    el['on' + type] = fn
  }
}

// 封装页面滚动的距离
function getScrollOffset(elem) {
  // 如果有参数，则直接返回元素被卷去的距离
  if (elem) {
    return {
      left: elem.scrollLeft,
      top: elem.scrolltop
    }
  } else {
    if (window.pageXOffset) {
      return {
        left: window.pageXOffset,
        top: window.pageYOffset
      }
    } else {
      return {
        left: document.body.scrollLeft + document.documentElement.scrollLeft,
        top: document.body.scrollTop + document.documentElement.scrollTop
      }
    }
  }
}

// 封装 页面的可视区域大小 兼容IE
function getViewportSize() {
  if (window.innerWidth) {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  } else {
    // 判断当前是什么模式，CSS1Compat是标准模式，BackCompat是怪异模式
    if (document.compatMode === 'CSS1Compat') {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      }
    } else {
      return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
      }
    }
  }
}

// 封装 文档的宽高
function getScrollSize() {
  if (document.body.scrollWidth) {
    return {
      width: document.body.scrollWidth,
      height: document.body.scrollHeight
    }
  } else {
    return {
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight
    }
  }
}
