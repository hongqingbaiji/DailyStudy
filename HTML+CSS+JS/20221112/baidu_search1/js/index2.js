;(function (doc) {
  var searchInput = doc.getElementsByClassName('J_searchInput')[0],
    wdList = doc.getElementsByClassName('J_wdList')[0],
    listWrap = wdList.parentNode,
    listTpl = doc.getElementById('J_listTpl').innerHTML

  var init = function () {
    bindEvent()
  }

  function bindEvent() {
    searchInput.addEventListener('input', tools.debounce(inputSearch, 500, false), false)
  }

  function inputSearch() {
    var val = _trimSpace(this.value),
      len = val.length

    if (len) {
      getDatas(val, 'setDatas')
    } else {
      // 清除数据
      wdList.innerHTML = ''
      listWrap.style.display = 'none'
    }
  }

  function getDatas(value, callbackName) {
    // var oScript = doc.createElement('script')
    // oScript.src =
    //   'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' + value + '&cb=' + callbackName

    // doc.body.appendChild(oScript)
    // doc.body.removeChild(oScript)

    tools.xhr.ajax({
      url: 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' + value,
      type: 'GET',
      dataType: 'JSONP',
      jsonp: 'cb',
      // jsonpCallback: 'test',
      success: function (data) {
        renderList(data)
      }
    })
  }

  function renderList(data) {
    var list = '',
      resArr = data.s,
      len = resArr.length,
      val = _trimSpace(searchInput.value)

    if (len) {
      resArr.forEach(function (elem) {
        list += listTpl.replace(/{{(.*?)}}/gim, function (node, key) {
          return {
            wdList: elem,
            wd: _setWdStyle(val, elem)
          }[key]
        })
      })

      wdList.innerHTML = list
      listWrap.style.display = 'block'
    } else {
      //清除数据
      wdList.innerHTML = ''
      listWrap.style.display = 'none'
    }
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
