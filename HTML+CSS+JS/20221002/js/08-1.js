window.onload = function () {
  init()
}

function init() {
  initMagnifier()
}

var initMagnifier = function () {
  var oImgWrap = document.getElementsByClassName('img-wrap')[0],
    oMagWrap = oImgWrap.getElementsByClassName('mag-wrap')[0],
    oMagImg = oMagWrap.getElementsByClassName('mag-img')[0],
    imgW = getStyles(oImgWrap, 'width'),
    imgH = getStyles(oImgWrap, 'height'),
    imgL = getElemDocPosition(oImgWrap).left,
    imgT = getElemDocPosition(oImgWrap).top,
    magW = getStyles(oMagWrap, 'width'),
    magH = getStyles(oMagWrap, 'height')

  addEvent(oImgWrap, 'mouseover', function (e) {
    showMag(getXY(e).x, getXY(e).y)
    oMagWrap.className += ' show'
    addEvent(document, 'mousemove', mouseMove)
  })
  addEvent(oImgWrap, 'mouseout', mouseOut)

  function mouseMove(e) {
    showMag(getXY(e).x, getXY(e).y, getXY(e).mouseX, getXY(e).mouseY)
  }

  function getXY(e) {
    var e = e || window.event
    return {
      x: pagePos(e).X - imgL - magW / 2,
      y: pagePos(e).Y - imgT - magH / 2,
      mouseX: pagePos(e).X - imgL,
      mouseY: pagePos(e).Y - imgT
    }
  }
  function showMag(x, y, mouseX, mouseY) {
    oMagWrap.style.left = x + 'px'
    oMagWrap.style.top = y + 'px'
    oMagImg.style.left = -x + 'px'
    oMagImg.style.top = -y + 'px'
    if (mouseX && mouseY) {
      if (mouseX < 0 || mouseX > imgW || mouseY < 0 || mouseY > imgH) {
        oMagWrap.className = 'mag-wrap'
      }
    }
  }
  function mouseOut() {
    oMagWrap.className = 'mag-wrap'
    removeEvent(oImgWrap, 'mousemove', mouseMove)
  }
}
