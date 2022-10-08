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
    magWidth = getStyles(oMagWrap, 'width'),
    magHeight = getStyles(oMagWrap, 'height'),
    imgX = getElemDocPosition(oImgWrap).left,
    imgY = getElemDocPosition(oImgWrap).top

  console.log(magWidth, magHeight)
  console.log(imgX, imgY)

  addEvent(oImgWrap, 'mouseover', function (e) {
    oMagWrap.className += ' show'

    var e = e || window.event,
      x = pagePos(e).X - magWidth / 2 - imgX,
      y = pagePos(e).Y - magHeight / 2 - imgY

    oMagWrap.style.left = x + 'px'
    oMagWrap.style.top = y + 'px'
    oMagImg.style.left = -x + 'px'
    oMagImg.style.top = -y + 'px'

    addEvent(document, 'mousemove', mouseMove)
  })
  addEvent(oImgWrap, 'mouseout', imgWrapMouseOut)

  function mouseMove(e) {
    var e = e || window.event,
      x = pagePos(e).X - magWidth / 2 - imgX,
      y = pagePos(e).Y - magHeight / 2 - imgY

    oMagWrap.style.left = x + 'px'
    oMagWrap.style.top = y + 'px'
    oMagImg.style.left = -x + 'px'
    oMagImg.style.top = -y + 'px'
  }
  function imgWrapMouseOut() {
    oMagWrap.className = 'mag-wrap'
  }
}
