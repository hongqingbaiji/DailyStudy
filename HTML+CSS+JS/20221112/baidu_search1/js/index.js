;(function (doc) {
  var searchInput = doc.getElementsByClassName('J_searchInput')[0],
    wdList = doc.getElementsByClassName('J_wdList')[0],
    listWrap = wdList.parentNode,
    listTpl = doc.getElementById('J_listTpl').innerHTML

  var init = function () {
    bindEvent()
  }

  function bindEvent() {
    searchInput.addEventListener('input', typeInput, false)
  }

  function typeInput() {
    var val = _trimSpace(this.value),
      len = val.length

    if (len > 0) {
      getDatas(val, 'setDatas')
    } else {
      wdList.innerHTML = ''
      listWrap.style.display = 'none'
    }
  }

  function renderList(data) {
    var arr = data.s,
      len = arr.length,
      list = '',
      val = _trimSpace(searchInput.value)

    if (len) {
      arr.forEach(function (elem) {
        list += listTpl.replace(/{{(.*?)}}/gim, function (node, key) {
          return {
            wdLink: elem,
            wd: _setWdStyle(val, elem)
          }[key]
        })
      })
      wdList.innerHTML = list
      listWrap.style.display = 'block'
    } else {
      wdList.innerHTML = ''
      listWrap.style.display = 'none'
    }
  }

  function getDatas(value, callbackName) {
    //JSONP跨域
    // var oScript = doc.createElement('script')
    // oScript.src =
    //   'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' + value + '&cb=' + callbackName
    // doc.body.appendChild(oScript)
    // doc.body.removeChild(oScript)

    // 使用封装好的JSONP跨域
    tools.xhr.ajax({
      url: 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' + value,
      type: 'GET',
      dataType: 'JSONP',
      jsonp: 'cb',
      success: function (data) {
        renderList(data)
      }
    })
  }

  // window.setDatas = function (data) {
  //   renderList(data)
  // }

  function _trimSpace(str) {
    return str.replace(/\s+/gim, '')
  }

  function _setWdStyle(value, word) {
    return '<span class="font-normal">' + value + '</span>' + word.replace(value, '')
  }

  init()
})(document)
