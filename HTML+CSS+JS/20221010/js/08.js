;(function (win, doc) {
  var oImgList = doc.getElementsByClassName('J-imgList')[0],
    data = JSON.parse(doc.getElementById('J_data').innerHTML),
    imgTpl = document.getElementById('J_imgTpl').innerHTML,
    oImgs = document.getElementsByClassName('list-img')

  var init = function () {
    oImgList.innerHTML = renderList(data)
    bindEvent()
    setTimeout(function () {
      window.scrollTo(0, 0)
    }, 150)
  }

  function bindEvent() {
    window.onload = window.onscroll = throttle(imgLazyLoad(oImgs, 500))
  }

  function renderList(data) {
    var list = ''

    data.forEach(function (elem) {
      list += imgTpl.replace(/{{(.*?)}}/g, function (node, key) {
        return {
          img: elem.img,
          name: elem.name
        }[key]
      })
    })
    return list
  }

  init()
})(window, document)

function imgLazyLoad(images) {
  var imgLen = images.length,
    n = 0

  return function () {
    var cHeight = document.documentElement.clientHeight,
      sTop = document.documentElement.scrollTop || document.body.scrollTop,
      imgItem

    for (var i = n; i < imgLen; i++) {
      imgItem = images[i]

      if (imgItem.offsetTop < cHeight + sTop) {
        imgItem.src = imgItem.getAttribute('data-src')
        imgItem.removeAttribute('data-src')
        n++
      }
    }
  }
}
