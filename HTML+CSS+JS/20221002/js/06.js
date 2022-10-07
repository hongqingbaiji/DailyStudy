;(function (doc) {
  var oList = document.getElementsByClassName('list')[0],
    oItems = document.getElementsByClassName('list-item'),
    curIdx = 0

  var init = function () {
    bindEvent()
  }

  function bindEvent() {
    //
    // for (var i = 0; i < oItems.length; i++) {
    // 用循环遍历的方式来绑定事件 ，不太好
    //   addEvent(oItems[i], 'mouseover', function () {
    //     oItems[curIdx].className = 'list-item'
    //     curIdx = Array.prototype.indexOf.call(oItems, this)
    //     oItems[curIdx].className = 'list-item active'
    //   })
    // }
    addEvent(oList, 'mouseover', slide)
    // 用事件代理的方式绑定事件
    function slide(e) {
      var e = e || window.event,
        tar = e.target || e.srcElement,
        oParent = getParent(tar, 'li'),
        thisIdx = Array.prototype.indexOf.call(oItems, oParent)

      if (curIdx !== thisIdx) {
        oItems[curIdx].className = 'list-item'
        curIdx = thisIdx
        oItems[curIdx].className += ' active'
      }
    }

    function getParent(target, element) {
      while (target.tagName.toLowerCase() !== element) {
        target = target.parentNode
      }
      return target
    }
  }
  init()
})(document)
