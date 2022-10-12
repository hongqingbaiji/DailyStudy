window.onload = function () {
  init()
}
function init() {
  initData()
  initActive()
}

var initData = function () {
  var oData = document.getElementById('j-rankdata').innerHTML,
    tpl = document.getElementById('tpl').innerHTML,
    oList = document.getElementsByClassName('list')[0],
    data = JSON.parse(oData),
    Len = data.length,
    item,
    list = ''

  for (var i = 0; i < Len; i++) {
    item = data[i]
    list += setTplToHTML(tpl, regTpl, {
      gname: item.gname,
      uname: item.uname,
      order: item.order,
      gimg: item.gimg,
      oimg: item.oimg,
      fNum: item.fNum
    })
  }
  oList.innerHTML = list
  function setTplToHTML(tpl, regExp, opt) {
    return tpl.replace(regExp(), function (node, key) {
      return opt[key]
    })
  }

  function regTpl() {
    return new RegExp(/{{(.*?)}}/, 'gim')
  }
}

var initActive = function () {
  var oListItem = document.getElementsByClassName('list-item'),
    oRankInfo = document.getElementsByClassName('rank-info')[0],
    oRankInfo2 = document.getElementsByClassName('rank-info2')[0],
    oListLen = oListItem.length,
    oItem

  for (var i = 0; i < oListLen; i++) {
    oItem = oListItem[i]
    addEvent(oListItem[i], 'mouseover', function () {
      oRankInfo.style.display = 'none'
      oRankInfo2.style.display = 'block'
    })
    addEvent(oListItem[i], 'mouseout', function () {
      oRankInfo.style.display = 'block'
      oRankInfo2.style.display = 'none'
    })
  }
}
