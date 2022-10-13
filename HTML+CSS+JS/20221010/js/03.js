window.onload = function () {
  init()
}
function init() {
  initCourses()
}

var initCourses = (function () {
  var oBtns = document.getElementsByClassName('btns')[0],
    oBtnItems = document.getElementsByClassName('btn-item'),
    oTpl = document.getElementById('J_tpl').innerHTML,
    oLoading = document.getElementsByClassName('loading')[0],
    oList = document.getElementsByClassName('list')[0],
    page = 0,
    t = null,
    cache = {}

  function init() {
    getAjaxCourses(page)
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
      page = thisIdx

      cache[page] ? getCacheCourses() : getAjaxCourses()

      for (var i = 0; i < len; i++) {
        item = oBtnItems[i]
        item.className = 'btn-item'
      }
      tar.className += ' active'
    }
  }

  function getAjaxCourses() {
    ajaxReturn({
      url: APIs.getCourses,
      data: {
        page: page
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

  function render(data) {
    var len = data.length,
      item,
      list = ''

    for (var i = 0; i < len; i++) {
      item = data[i]
      list += setTplToHTML(oTpl, regTpl, {
        classname: item.classname,
        name: item.name,
        watched: item.watched
      })
    }
    oList.innerHTML = list
  }

  function getCacheCourses() {
    var data = cache[page]
    render(data)
  }

  return function () {
    init()
  }
})()

var APIs = {
  getCourses: 'http://study.jsplusplus.com/Lfcourses/getCourses'
}

function ajaxReturn(opt) {
  $.ajax({
    url: opt.url,
    type: 'POST',
    dataTypeL: 'JSON',
    data: opt.data,
    timeout: 100000,
    success: opt.success,
    error: opt.error
  })
}
