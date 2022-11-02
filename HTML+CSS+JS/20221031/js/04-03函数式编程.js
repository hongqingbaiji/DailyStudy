;(function (doc) {
  var courseData = JSON.parse(doc.getElementById('js-course-data').innerHTML),
    oCardItemTpl = doc.getElementById('js-card-item-tpl').innerHTML,
    oCourseCardList = doc.getElementsByClassName('js-course-card-list')[0],
    oCourseTabList = doc.getElementsByClassName('js-course-tab-list')[0],
    oSearchInput = doc.getElementById('js-search-input'),
    oCourseTabLks = doc.getElementsByClassName('course-tab-lk'),
    oCourseTabLksLen = oCourseTabLks.length

  var opt = {
    data: courseData,
    template: oCardItemTpl,
    wrap: oCourseCardList,
    tabLks: oCourseTabLks,
    tabLksLen: oCourseTabLksLen
  }

  var init = function () {
    initCourseList(opt, courseData)
    bindEvent()
  }

  function bindEvent() {
    oCourseTabList.addEventListener('click', tabClick.bind(oCourseTabList, oCourseTabLks), false)
    oSearchInput.addEventListener('input', searchCourse, false)
  }

  function tabClick(oCourseTabLks, e) {
    var e = e || window.event,
      tar = e.target || e.srcElement,
      className = tar.className

    if (className === 'course-tab-lk') {
      var field = tar.getAttribute('data-field')
      changeTabCurrent(tar, opt)

      oCourseCardList.innerHTML = renderList(opt, filterData(courseData, field))
    }
  }

  function searchCourse() {
    var val = this.value
    len = val.length

    if (len > 0) {
      var data = searchData(courseData, val),
        dataLen = data.length

      if (data && dataLen > 0) {
        oCourseCardList.innerHTML = renderList(opt, data)
      } else {
        oCourseCardList.innerHTML = showTips('未搜索到相关课程')
      }
    } else {
      restoreList(opt)
    }
  }

  function renderList(opt, data) {
    var list = '',
      template = opt.template

    data.forEach(function (elem) {
      list += template.replace(/{{(.*?)}}/g, function (node, key) {
        return replaceTpl(elem)[key]
      })
    })
    return list
  }

  function replaceTpl(elem) {
    return {
      img: elem.img,
      courseName: elem.course,
      isFree: elem.is_free === '1' ? 'free' : 'vip',
      price: elem.is_free === '1' ? '免费' : '￥' + elem.price + '.00',
      hours: elem.classes
    }
  }

  function filterData(data, field) {
    if (field === 'all') {
      return data
    }
    return data.filter(function (elem) {
      switch (field) {
        case 'free':
          return elem.is_free === '1'
        case 'vip':
          return elem.is_free === '0'
        default:
          return true
      }
    })
  }

  function searchData(data, keyword) {
    return data.reduce(function (prev, elem) {
      var res = elem.course.indexOf(keyword)
      if (res !== -1) {
        prev.push(elem)
      }
      return prev
    }, [])
  }

  function initCourseList(opt, data) {
    oCourseCardList.innerHTML = renderList(opt, data)
  }

  function restoreList(opt) {
    var data = opt.data
    initCourseList(opt, data)
    changeTabCurrent(oCourseTabLks[0], opt)
  }

  function changeTabCurrent(currentDom, opt) {
    var tabLks = opt.tabLks,
      tabLksLen = opt.tabLksLen,
      item
    for (var i = 0; i < tabLksLen; i++) {
      item = tabLks[i]
      item.className = 'course-tab-lk'
    }
    currentDom.className += ' current'
  }

  function showTips(text) {
    return '<div class="course-card-text"><span>' + text + '</span></div>'
  }

  init()
})(document)
