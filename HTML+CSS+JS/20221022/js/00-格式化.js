var oDiv = document.getElementsByTagName('div')[0],
  oSpan = document.getElementsByTagName('span')[0],
  oBtn = document.getElementsByTagName('button')[0],
  oSpanLeft = parseInt(getStyles(oSpan, 'left')),
  oDivLeft

oBtn.onclick = function () {
  oDivLeft = parseInt(getStyles(oDiv, 'left'))

  if (oDivLeft === 0) {
    elasticMove({
      obj: oDiv,
      target: oSpanLeft
    })
  }
}

function elasticMove(json) {
  var obj = json.obj,
    target = json.target || 300,
    attr = json.attr || 'left',
    len = json.len || target / 5,
    init = parseInt(getStyles(obj, attr)),
    set = 0

  if (!obj.timers) {
    obj.timers = {}
  }
  console.log(obj.timers)
  obj.timers[attr] = setInterval(function () {
    set = init + target + len
    len = -len * 0.9
    obj.style[attr] = set + 'px'

    if (Math.round(len) === 0) {
      obj.style[attr] = target + 'px'
      clearInterval(obj.timers[attr])
      obj.timers[attr] = null
    }
  }, 50)
}

function getStyles(elem, prop) {
  if (window.getComputedStyle) {
    return prop ? window.getComputedStyle(elem, null)[prop] : window.getComputedStyle(elem, null)
  } else if (elem.currentStyle) {
    return prop ? elem.currentStyle[prop] : elem.currentStyle
  }
}
