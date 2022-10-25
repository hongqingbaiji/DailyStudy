var oTop = document.getElementsByClassName('top')[0],
  oBottom = document.getElementsByClassName('bottom')[0]

oTop.onclick = function () {
  startMove(
    this,
    {
      width: 200,
      height: 200,
      left: 200,
      top: 200,
      opacity: 50
    },
    function () {
      startMove(
        oBottom,
        {
          width: 200,
          height: 200,
          left: 200,
          top: 200,
          opacity: 50
        },
        function () {
          console.log('over')
        }
      )
    }
  )
}
oTop.onmouseout = function () {}

function startMove(dom, attrObj, callback) {
  var iCur = null,
    iSpeed = null
  clearInterval(dom.timer)
  dom.timer = setInterval(function () {
    var allStop = true
    for (var attr in attrObj) {
      iCur =
        attr === 'opacity' ? parseFloat(getStyles(dom, attr)) * 100 : parseInt(getStyles(dom, attr))
      iSpeed = (attrObj[attr] - iCur) / 7
      iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed)

      if (iCur !== attrObj[attr]) {
        allStop = false
      }
      dom.style[attr] = attr === 'opacity' ? (iCur + iSpeed) / 100 : iCur + iSpeed + 'px'
    }
    if (allStop) {
      clearInterval(dom.timer)
      typeof callback === 'function' && callback()
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
