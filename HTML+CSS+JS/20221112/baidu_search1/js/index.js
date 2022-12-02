;(function (doc) {
  var oSearchInput = doc.getElementsByClassName('J_searchInput')[0],
    oWdList = doc.getElementsByClassName('J_wdList')[0],
    oListWrap = oWdList.parentNode,
    oListTpl = doc.getElementById('J_listTpl').innerHTML

  var init = function () {
    bindEvent()
  }

  function bindEvent() {
    oSearchInput.addEventListener('input', tools.debounce(typeInput, 500, false), false)
  }

  function typeInput() {
    var val = _trimSpace(this.value),
      len = val.length

    if (len) {
      // getDatas(val, 'setDatas')
      getDatas(val)
    } else {
      oWdList.innerHTML = ''
      oListWrap.style.display = 'none'
    }
  }

  function renderList(data) {
    var list = '',
      arr = data.s,
      len = arr.length,
      val = _trimSpace(oSearchInput.value)

    if (len) {
      arr.forEach(function (elem, idx) {
        if (idx <= 3) {
          list += oListTpl.replace(/{{(.*?)}}/g, function (node, key) {
            return {
              wdLink: elem,
              wd: _setWdStyle(val, elem)
            }[key]
          })
        }
      })
      oWdList.innerHTML = list
      oListWrap.style.display = 'block'
    } else {
      oWdList.innerHTML = ''
      oListWrap.style.display = 'none'
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
      success: function (data) {
        renderList(data)
      }
    })
  }

  // window.setDatas = function (data) {
  //   renderList(data)
  // }

  function _trimSpace(str) {
    return str.replace(/\s+/g, '')
  }

  function _setWdStyle(value, word) {
    return '<span class="font-normal"> ' + value + '</span>' + word.replace(value, '')
  }

  init()
})(document)
