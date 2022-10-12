// 封装库

// 1. 封装typeof
function myTypeof(target) {
  var type = typeof target
  var toStr = Object.prototype.toString
  var template = {
    '[object Array]': 'array',
    '[object Object]': 'object',
    '[object Number]': 'object number',
    '[object String]': 'object string',
    '[object Boolean]': 'object boolean',
    '[object Date]': 'object date',
    '[object RegExp]': 'object regExp'
  }
  if (type === 'null') {
    return 'null'
  } else if (type === 'object') {
    var res = toStr.call(target)
    return template[res]
  } else {
    return type
  }
}

// 2-1. 浅拷贝
// origin是被拷贝的对象, target是拷贝的对象
function clone(origin, target) {
  var target = target || {}
  for (var key in origin) {
    if (origin.hasOwnProperty(key)) {
      target[key] = origin[key]
    }
  }
  return target
}

// 2-2. 深拷贝
// 其实就是判断键值是不是引用值，是的话就调用自己把引用值再拷贝一遍
function deepClone(origin, target) {
  var target = target || {}
  // Object.prototype.toString.call(obj) 判断obj是什么类型的引用值
  var toStr = Object.prototype.toString
  for (var key in origin) {
    if (origin.hasOwnProperty(key)) {
      // 判断被拷贝项 内层键值是不是引用值
      if (typeof origin[key] === 'object' && origin[key] !== null) {
        // 判断是数组还是对象，给目标对象赋初始值
        if (toStr.call() === '[object Array]') {
          target[key] = []
        } else {
          target[key] = {}
        }
        deepClone(origin[key], target[key])
      } else {
        target[key] = origin[key]
      }
    }
  }
  return target
}

// 3. 在原型上封装一下星期
Date.prototype.getWeekDay = function (lang) {
  var day = this.getDay(),
    cArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    eArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return lang === 'chs' ? cArr[day] : eArr[day]
}

// 4. 封装一下 childNodes，让它只返回子元素节点 children
function elemChildren(node) {
  var temp = {
      length: 0,
      push: Array.prototype.push,
      splice: Array.prototype.splice
    },
    children = node.childNodes,
    len = children.length,
    item
  for (var i = 0; i < len; i++) {
    item = children[i]
    if (item.nodeType === 1) {
      temp.push(item)
    }
  }
  return temp
}

// 5. 原型上封装 insertAfter()
// 要求和insertBefore()相反，要将一个元素插入到选定元素的后面
Node.prototype.insertAfter = function (target, origin) {
  var nextElem = origin.nextElementSibling
  return nextElem ? this.insertBefore(target, nextElem) : this.appendChild(target)
}

// 6. 封装 页面滚动的距离 使其兼容IE
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

// 7. 封装 页面的可视区域大小 兼容IE
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

// 8. 封装一下 文档的宽高
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

// 9. 封装 求元素到body的距离
function getElemDocPosition(elem) {
  var parent = elem.offsetParent,
    offsetLeft = elem.offsetLeft,
    offsetTop = elem.offsetTop
  while (parent) {
    offsetLeft += parent.offsetLeft
    offsetTop += parent.offsetTop
    parent = parent.offsetParent
  }
  return {
    left: offsetLeft,
    top: offsetTop
  }
}

// 10. 封装查看样式属性值
function getStyles(elem, prop) {
  if (window.getComputedStyle) {
    if (prop) {
      return parseInt(window.getComputedStyle(elem, null)[prop])
    } else {
      return window.getComputedStyle(elem, null)
    }
  } else {
    if (prop) {
      return parseInt(elem.currentStyle[prop])
    } else {
      return elem.currentStyle
    }
  }
}

// 11. 封装一下 绑定事件处理函数
function addEvent(el, type, fn) {
  if (el.addEventListener) {
    el.addEventListener(type, fn, false)
  } else if (el.attachEvent) {
    el.attachEvent('on' + type, function () {
      fn.call(el) //因为这里面的this指向window,所以重新绑定下this
    })
  } else {
    el['on' + type] = fn
  }
}

// 12. 封装解除绑定事件处理函数
function removeEvent(el, type, fn) {
  if (el.addEventListener) {
    el.removeEventListener(type, fn, false)
  } else if (el.attachEvent) {
    el.detachEvent('on' + type, fn)
  } else {
    el['on' + type] = null
  }
}

// 13. 封装 取消冒泡事件
function cancelBubble(e) {
  var e = e || window.event //兼容IE8及以下
  if (e.stopPropagation) {
    e.stopPropagation()
  } else {
    e.cancelBubble = true //IE写法
  }
}

// 14. 封装取消默认事件
function preventDefaultEvent(e) {
  var e = e || window.event
  if (e.preventDefault) {
    e.preventDefault()
  } else {
    e.returnValue = false
  }
}

// 15. 封装一下 鼠标位置相对于文档左上角的坐标
// 文档的距离 = 可视区域的距离 + 滚动条的距离 - 文档偏移量
// 用到了滚动距离的封装函数
function pagePos(e) {
  var sLeft = getScrollOffset().left,
    sTop = getScrollOffset().top,
    cLeft = document.documentElement.clientLeft || 0,
    cTop = document.documentElement.clientTop || 0

  return {
    X: e.clientX + sLeft - cLeft,
    Y: e.clientY + sTop - cTop
  }
}

// 16. 判断点是否在一个三角形内
var pointInTriangle = (function () {
  function vec(a, b) {
    return {
      x: b.x - a.x,
      y: b.y - a.y
    }
  }
  function vecProduct(v1, v2) {
    return v1.x * v2.y - v2.x * v1.y
  }
  function sameSymbols(a, b) {
    return (a ^ b) >= 0
  }

  return function (opt) {
    var PA = vec(opt.curPos, opt.lastPos),
      PB = vec(opt.curPos, opt.topLeft),
      PC = vec(opt.curPos, opt.bottomLeft),
      R1 = vecProduct(PA, PB),
      R2 = vecProduct(PB, PC),
      R3 = vecProduct(PC, PA)

    return sameSymbols(R1, R2) && sameSymbols(R2, R3)
  }
})()

// 正则表达式
function setTplToHTML(tpl, regExp, opt) {
  return tpl.replace(regExp(), function (node, key) {
    return opt[key]
  })
}

function regTpl() {
  return new RegExp(/{{(.*?)}}/, 'gim')
}
