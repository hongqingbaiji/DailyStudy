window.onload = function () {
  init()
}

function init() {
  initGameList()
}

var initGameList = (function () {
  var oBtns = document.getElementsByClassName('btns')[0],
    oBtnItems = document.getElementsByClassName('btn-item'),
    oTpl = document.getElementById('J_tpl'),
    oLoading = document.getElementsByClassName('loading')[0],
    oList = document.getElementsByClassName('list')[0],
    page = ['editor_fav', 'editor_subject', 'editor_complete'],
    pageInfo = page[0],
    t = null,
    cache = {}

  function init() {
    getAjaxGameInfo(pageInfo)
    bindEvent()
  }

  function bindEvent() {
    addEvent(oBtns, 'click', btnClick)
  }

  function btnClick(e) {
    var e = e || window.event,
      tar = e.target || e.srcElement,
      className = tar.className,
      indexOf = Array.prototype.indexOf,
      thisIdx = -1

    if (className === 'btn-item') {
      var len = oBtnItems.length,
        item
      thisIdx = indexOf.call(oBtnItems, tar)
      pageInfo = page[thisIdx]

      cache[pageInfo] ? getCacheGameInfo() : getAjaxGameInfo()

      for (var i = 0; i < len; i++) {
        item = oBtnItems[i]
        item.className = 'btn-item'
      }
      tar.className += ' active'
    }
  }

  function getAjaxGameInfo() {
    ajaxReturn({
      url: APIs.getGameInfo,
      data: {
        pageInfo: pageInfo
      },
      success: function (data) {
        cache[page] = data
        oLoading.style.display = 'block'
        t = setTimeout(function () {
          render(data)
          oLoading.style.display = 'none'
        }, 500)
      },
      error: function () {
        alert('获取数据失败')
      }
    })
  }

  function getCacheGameInfo() {
    var data = cache[pageInfo]
    render(data)
  }

  function render(data) {
    var list = '',
      len = data.length,
      item

    for (var i = 0; i < len; i++) {
      item = data[i]
      list += setTplToHTML(oTpl, regTpl, {
        real_thumb: item.real_thumb,
        gname: item.gname,
        author_uname: item.author_uname,
        release_word_sum: item.release_word_sum
      })
    }
    oList.innerHTML = list
  }

  return function () {
    init()
  }
})()

var APIs = {
  getGameInfo: 'https://m.66rpg.com/main/ajax/indexNew/get_edit_recommend_data?token=&client=0'
}
// 使用JQuery 封装Ajax
function ajaxReturn(opt) {
  $.ajax({
    url: opt.url,
    type: 'POST',
    dataType: 'JSON',
    data: opt.data,
    timeout: 100000,
    success: opt.success,
    error: opt.error
  })
}
