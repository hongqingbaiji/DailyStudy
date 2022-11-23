// 封装库
var tools = {
  // 1. 封装typeof
  myTypeof: function (target) {
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
  },

  // 2-1. 浅拷贝
  // origin是被拷贝的对象, target是拷贝的对象
  clone: function (origin, target) {
    var target = target || {}
    for (var key in origin) {
      if (origin.hasOwnProperty(key)) {
        target[key] = origin[key]
      }
    }
    return target
  },

  // 2-2. 深拷贝
  // 其实就是判断键值是不是引用值，是的话就调用自己把引用值再拷贝一遍
  deepClone: function (origin, target) {
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
  },

  // 4. 封装一下 childNodes，让它只返回子元素节点 children
  elemChildren: function (node) {
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
  },

  // 6. 封装 页面滚动的距离 使其兼容IE
  getScrollOffset: function (elem) {
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
  },

  // 7. 封装 页面的可视区域大小 兼容IE
  getViewportSize: function () {
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
  },

  // 8. 封装一下 文档的宽高
  getScrollSize: function () {
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
  },

  // 9. 封装 求元素到body的距离
  getElemDocPosition: function (elem) {
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
  },

  // 10. 封装查看样式属性值
  getStyles: function (elem, prop) {
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
  },

  // 11. 封装一下 绑定事件处理函数
  addEvent: function (el, type, fn) {
    if (el.addEventListener) {
      el.addEventListener(type, fn, false)
    } else if (el.attachEvent) {
      el.attachEvent('on' + type, function () {
        fn.call(el) //因为这里面的this指向window,所以重新绑定下this
      })
    } else {
      el['on' + type] = fn
    }
  },

  // 12. 封装解除绑定事件处理函数
  removeEvent: function (el, type, fn) {
    if (el.addEventListener) {
      el.removeEventListener(type, fn, false)
    } else if (el.attachEvent) {
      el.detachEvent('on' + type, fn)
    } else {
      el['on' + type] = null
    }
  },

  // 13. 封装 取消冒泡事件
  cancelBubble: function (e) {
    var e = e || window.event //兼容IE8及以下
    if (e.stopPropagation) {
      e.stopPropagation()
    } else {
      e.cancelBubble = true //IE写法
    }
  },

  // 14. 封装取消默认事件
  preventDefaultEvent: function (e) {
    var e = e || window.event
    if (e.preventDefault) {
      e.preventDefault()
    } else {
      e.returnValue = false
    }
  },

  // 15. 封装一下 鼠标位置相对于文档左上角的坐标
  // 文档的距离 = 可视区域的距离 + 滚动条的距离 - 文档偏移量
  // 用到了滚动距离的封装函数
  pagePos: function (e) {
    var sLeft = getScrollOffset().left,
      sTop = getScrollOffset().top,
      cLeft = document.documentElement.clientLeft || 0,
      cTop = document.documentElement.clientTop || 0

    return {
      X: e.clientX + sLeft - cLeft,
      Y: e.clientY + sTop - cTop
    }
  },

  // 16.元素拖拽
  elemDrag: function (elem) {
    var x, y
    addEvent(elem, 'mousedown', function (e) {
      var e = e || window.event
      x = pagePos(e).X - getStyles(elem, 'left')
      y = pagePos(e).Y - getStyles(elem, 'top')

      addEvent(document, 'mousemove', mouseMove)
      addEvent(document, 'mouseup', mouseUp)
    })
    function mouseMove(e) {
      var e = e || window.event
      elem.style.left = pagePos(e).X - x + 'px'
      elem.style.top = pagePos(e).Y - y + 'px'
    }
    function mouseUp(e) {
      var e = e || window.event
      removeEvent(document, 'mousemove', mouseMove)
      removeEvent(document, 'mouseup', mouseUp)
      cancelBubble(e)
      preventDefaultEvent(e)
    }
  },

  // 17. 判断点是否在一个三角形内
  pointInTriangle: (function () {
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
  })(),

  // 18. 正则表达式
  setTplToHTML: function (tpl, regExp, opt) {
    return tpl.replace(regExp(), function (node, key) {
      return opt[key]
    })
  },

  regTpl: function () {
    return new RegExp(/{{(.*?)}}/, 'gim')
  },

  // 19. 封装节流函数
  throttle: function (callback, time) {
    var value = true
    return function () {
      if (value) {
        value = false
        setTimeout(function () {
          callback.apply(this, arguments)
          value = true
        }, time)
      }
    }
  },

  // 21. 弹性运动封装
  elasticMove: function (json) {
    var obj = json.obj,
      target = json.target,
      attr = json.attr || 'left',
      len = target,
      k = json.k || 0.7, // 弹性系数
      z = json.z || 0.6, // 阻力系数
      cur = parseInt(getStyles(obj, attr)),
      step = 0

    // 判断target值是否合规，不合规给一个默认值300
    target = isNaN(Number(target)) ? 300 : Number(target)

    if (!obj.timers) {
      obj.timers = {}
    }

    //判断是否存在定时器，存在的话直接return，不开启新的定时器
    if (obj.timers[attr]) {
      return
    }

    obj.timers[attr] = setInterval(function () {
      cur = parseInt(getStyles(obj, attr))
      len = target - cur
      step += len * k
      step = step * z

      if ((attr === 'width' || attr === 'height') && cur + step < 0) {
        obj.style[attr] = 0
      } else {
        obj.style[attr] = cur + step + 'px'
      }

      if (Math.round(step) === 0 && Math.round(len) === 0) {
        obj.style[attr] = target + 'px'
        clearInterval(obj.timers[attr])
        obj.timers[attr] = null
      }
    }, 10)
  },

  // 22. 普通运动封装
  startMove: function (dom, attrObj, callback) {
    var iCur = null,
      iSpeed = null
    clearInterval(dom.timer)
    dom.timer = setInterval(function () {
      var allStop = true // 声明一个标识符，判断是否所有运动项都已结束
      // 循环遍历运动属性的对象
      for (var attr in attrObj) {
        iCur =
          attr === 'opacity'
            ? parseFloat(getStyles(dom, attr)) * 100
            : parseInt(getStyles(dom, attr))
        iSpeed = (attrObj[attr] - iCur) / 7
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed)

        if (iCur !== attrObj[attr]) {
          allStop = false
        }
        dom.style[attr] = attr === 'opacity' ? (iCur + iSpeed) / 100 : iCur + iSpeed + 'px'
      }
      // 只有所有属性都运动完毕 才能清除计时器，并执行回调函数
      if (allStop) {
        clearInterval(dom.timer)
        typeof callback === 'function' && callback()
      }
    }, 10)
  },

  // 25. 防抖函数
  // 延迟执行，n秒内重复触发会重新计时
  debounce: function (fn, time, triggleNow) {
    var t = null,
      res

    var debounced = function () {
      var _args = arguments,
        _self = this

      if (t) {
        clearTimeout(t)
      }

      if (triggleNow) {
        var exec = !t

        t = setTimeout(function () {
          t = null
        }, time)

        if (exec) {
          res = fn.apply(_self, _args)
        }
      } else {
        t = setTimeout(function () {
          res = fn.apply(_self, _args)
        }, time)
      }
      return res
    }

    debounced.remove = function () {
      clearTimeout(t)
      t = null
    }

    return debounced
  },

  // 26. 节流函数
  // n秒内只执行一次绑定事件处理函数
  throttle: function (fn, delay) {
    var t = null,
      begin = new Date().getTime()

    return function () {
      var _self = this,
        args = arguments,
        cur = new Date().getTime()

      clearTimeout(t)

      if (cur - begin >= delay) {
        fn.apply(_self, args)
        begin = cur
      } else {
        t = setTimeout(function () {
          fn.apply(_self, args)
        }, delay)
      }
    }
  },

  // 27. 封装数据归类函数
  //sort:据以归类的表格， data：要归类的表格数据
  sortDatas: function (sort, data) {
    var cache = {}

    //foreign_key: 外键, sortType: 归类类型
    return function (foreign_key, sortType) {
      if (sortType !== 'single' && sortType !== 'multi') {
        console.log(new Error('Invalid sort type.[only "single" and "multi" are valid values]'))
        return
      }

      sort.forEach(function (sortElem) {
        var _id = sortElem.id
        cache[_id] = []

        data.forEach(function (dataElem) {
          var foreign_val = dataElem[foreign_key]
          switch (sortType) {
            case 'single':
              if (foreign_val === _id) {
                cache[_id].push(dataElem)
              }
              break
            case 'multi':
              var _arr = foreign_val.split(',')
              _arr.forEach(function (_arrElem) {
                if (_arrElem === _id) {
                  cache[_id].push(dataElem)
                }
              })
              break
            default:
              break
          }
        })
      })
      return cache
    }
  },

  // 28. 封装AJAX
  xhr: (function () {
    function _doAjax(opt) {
      var o = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')

      if (!o) {
        throw new Error('您的浏览器不支持异步发起HTTP请求')
      }

      var opt = opt || {},
        type = (opt.type || 'GET').toUpperCase(),
        async = '' + opt.async === 'false' ? false : true,
        dataType = opt.dataType || 'JSON',
        jsonp = opt.jsonp || 'cb',
        jsonpCallback = opt.jsonpCallback || 'jQuery' + randomNum() + '_' + new Date().getTime(),
        url = opt.url,
        data = opt.data || null,
        timeout = opt.timeout || 30000,
        error = opt.error || function () {},
        success = opt.success || function () {},
        complete = opt.complete || function () {},
        t = null

      if (!url) {
        throw new Error('您没有填写URL')
      }

      if (dataType.toUpperCase() === 'JSONP' && type !== 'GET') {
        throw new Error('如果dataType为JSONP, type请您设置GET或不设置')
      }

      if (dataType.toUpperCase() === 'JSONP') {
        var oScript = document.createElement('script')
        oScript.src =
          url.indexOf('?') === -1
            ? url + '?' + jsonp + '=' + jsonpCallback
            : url + '&' + jsonp + '=' + jsonpCallback
        document.body.appendChild(oScript)
        document.body.removeChild(oScript)
        window[jsonpCallback] = function (data) {
          success(data)
        }
        return
      }

      o.onreadystatechange = function () {
        if (o.readyState === 4) {
          if ((o.status >= 200 && o.status < 300) || o.status === 304) {
            switch (dataType.toUpperCase()) {
              case 'JSON':
                success(JSON.parse(o.responseText))
                break
              case 'TEXT':
                success(o.responseText)
                break
              case 'XML':
                success(o.responseXML)
                break
              default:
                success(JSON.parse(o.responseText))
            }
          } else {
            error()
          }
          complete()
          clearTimeout(t)
          t = null
          o = null
        }
      }

      o.open(type, url, async)
      type === 'POST' && o.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      o.send(type === 'GET' ? null : formatDatas(data))

      t = setTimeout(function () {
        o.abort()
        clearTimeout(t)
        t = null
        o = null
        throw new Error('本次请求已超时,API地址:' + url)
      }, timeout)
    }

    function formatDatas(obj) {
      var str = ''
      for (var key in obj) {
        str += key + '=' + obj[key] + '&'
      }
      return str.replace(/&$/, '')
    }

    function randomNum() {
      var num = ''
      for (var i = 0; i < 20; i++) {
        num += Math.floor(Math.random() * 10)
      }
      return num
    }

    return {
      ajax: function (opt) {
        _doAjax(opt)
      },

      post: function (url, data, dataType, successCB, errorCB, completeCB) {
        _doAjax({
          type: 'POST',
          url: url,
          data: data,
          dataType: dataType,
          success: successCB,
          error: errorCB,
          complete: completeCB
        })
      },

      get: function (url, dataType, successCB, errorCB, completeCB) {
        _doAjax({
          type: 'GET',
          url: url,
          dataType: dataType,
          success: successCB,
          error: errorCB,
          complete: completeCB
        })
      }
    }
  })()
}

// 3. 在原型上封装一下星期
Date.prototype.getWeekDay = function (lang) {
  var day = this.getDay(),
    cArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    eArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return lang === 'chs' ? cArr[day] : eArr[day]
}

// 5. 原型上封装 insertAfter()
// 要求和insertBefore()相反，要将一个元素插入到选定元素的后面
Node.prototype.insertAfter = function (target, origin) {
  var nextElem = origin.nextElementSibling
  return nextElem ? this.insertBefore(target, nextElem) : this.appendChild(target)
}

// 23.封装forEach/filter/map/every/some
// 封装 forEach()
Array.prototype.myForEach = function (fn) {
  var arr = this,
    len = arr.length,
    arg2 = arguments[1] || window

  for (var i = 0; i < len; i++) {
    fn.apply(arg2, [arr[i], i, arr])
  }
}

// 封装 filter()
Array.prototype.myFilter = function (fn) {
  var arr = this,
    len = arr.length,
    arg2 = arguments[1] || window,
    newArr = [],
    item

  for (var i = 0; i < len; i++) {
    item = tools.deepClone(arr[i])
    if (fn.apply(arg2, [arr[i], i, arr])) {
      newArr.push(item)
    }
  }
  return newArr
}

// 封装 map() 因为使用了深拷贝，所以不会修改原数组
Array.prototype.myMap = function (fn) {
  var arr = this,
    len = arr.length,
    arg2 = arguments[1] || window,
    nArr = [],
    item

  for (var i = 0; i < len; i++) {
    item = tools.deepClone(arr[i])
    nArr.push(fn.apply(arg2, [item, i, arr]))
  }
  return nArr
}

// 封装 every()
Array.prototype.myEvery = function (fn) {
  var arr = this,
    len = arr.length,
    arg2 = arguments[1] || window,
    res = true

  for (var i = 0; i < len; i++) {
    if (!fn.apply(arg2, [arr[i], i, arr])) {
      res = false
      break
    }
  }
  return res
}

// 封装 some()
Array.prototype.mySome = function (fn) {
  var arr = this,
    len = arr.length,
    arg2 = arguments[1] || window,
    res = false

  for (var i = 0; i < len; i++) {
    if (fn.apply(arg2, [arr[i], i, arr])) {
      res = true
      break
    }
  }
  return res
}

// 24. 封装 reduce() / reduceRight()
// 封装 reduce()
Array.prototype.myReduce = function (fn, initialValue) {
  var arr = this,
    len = arr.length,
    arg2 = arguments[2] || window,
    item

  for (var i = 0; i < len; i++) {
    initialValue = fn.apply(arg2, [initialValue, arr[i], i, arr])
  }
  return initialValue
}

// 封装 reduceRight()
Array.prototype.myReduceRight = function (fn, initialValue) {
  var arr = this,
    len = arr.length,
    arg2 = arguments[2] || window,
    item

  for (var i = len - 1; i >= 0; i--) {
    initialValue = fn.apply(arg2, [initialValue, arr[i], i, arr])
  }
  return initialValue
}
