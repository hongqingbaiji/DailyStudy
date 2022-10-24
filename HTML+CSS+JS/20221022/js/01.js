;(function () {
  var oWrapBd = document.getElementsByClassName('wrap-bd')[0],
    oHdItems = document.getElementsByClassName('hd-item'),
    oBdItems = document.getElementsByClassName('bd-item'),
    oBdItemsLen = oBdItems.length

  var init = function () {
    pageChange()
    bindEvent()
  }

  window.onhashchange = function () {
    pageChange()
  }

  function bindEvent() {
    oWrapBd.addEventListener('click', bdClick, false)
  }

  function bdClick(e) {
    var e = e || window.event,
      tar = e.target || e.srcElement,
      className = tar.className,
      hashName = tar.getAttribute('data-page')

    if (className === 'bd-item') {
      location.hash = '#' + hashName
    }
  }

  function pageChange() {
    var hashName = location.hash.slice(1),
      hasThisHash = checkHashName(hashName).hasThisHash,
      thisIdx = checkHashName(hashName).index,
      bdItem,
      hdItem

    if (hasThisHash) {
      location.hash = '#' + hashName
    } else {
      location.hash = '#home'
      thisIdx = 0
    }

    for (var i = 0; i < oBdItemsLen; i++) {
      bdItem = oBdItems[i]
      hdItem = oHdItems[i]
      bdItem.className = 'bd-item'
      hdItem.className = 'hd-item'
    }
    oBdItems[thisIdx].className += ' active'
    oHdItems[thisIdx].className += ' show'
  }

  function checkHashName(hashName) {
    var thisIdx = 0,
      page = '',
      hasThisHash = false,
      item

    for (var i = 0; i < oBdItemsLen; i++) {
      item = oBdItems[i]
      page = item.getAttribute('data-page')

      if (hashName === page) {
        hasThisHash = true
        thisIdx = i
        break
      }
    }
    return {
      hasThisHash: hasThisHash,
      index: thisIdx
    }
  }

  init()
})()
