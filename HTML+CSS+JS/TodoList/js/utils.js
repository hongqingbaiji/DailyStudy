// 封装绑定事件
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

// 封装 查找子元素
function elemChildren(node) {
  var children = node.childNodes,
    len = children.length,
    item

  var temp = {
    length: 0,
    push: Array.prototype.push,
    splice: Array.prototype.splice
  }

  for (var i = 0; i < len; i++) {
    item = children[i]
    if (item.nodeType === 1) {
      temp.push(item)
    }
  }
  return temp
}
