var initCourseTab = (function (doc) {
  var courseData = JSON.parse(doc.getElementById('js-course-data').innerHTML),
    cardItemTpl = doc.getElementById('js-card-item-tpl').innerHTML,
    courseCardList = doc.getElementsByClassName('js-course-card-list')[0],
    oSearchInput = doc.getElementById('js-search-input'),
    courseTabLks = doc.getElementsByClassName('course-tab-lk'),
    courseTabLksLen = courseTabLks.length

  return {
    searchCourse: function () {
      var val = oSearchInput.value,
        len = val.length

      if (len > 0) {
        var data = this.searchData(courseData, val)

        if (data && data.length > 0) {
          courseCardList.innerHTML = this.makeList(data)
        } else {
          courseCardList.innerHTML = this.showTips('未搜索到相关课程')
        }
      } else {
        this.restoreList()
      }
    },

    tabClick: function (e) {
      var e = e || window.event,
        tar = e.target || e.srcElement,
        className = tar.className,
        item

      if (className === 'course-tab-lk') {
        var field = tar.getAttribute('data-field')
        this.changeTabCurrent(tar)
        courseCardList.innerHTML = this.makeList(this.filterData(courseData, field))
      }
    },

    makeList: function (data) {
      var list = ''
      data.forEach(function (elem) {
        list += cardItemTpl.replace(/{{(.*?)}}/g, function (node, key) {
          return {
            img: elem.img,
            courseName: elem.course,
            isFree: elem.is_free === '1' ? 'free' : 'vip',
            price: elem.is_free === '1' ? '免费' : '￥' + elem.price + '.00',
            hours: elem.classes
          }[key]
        })
      })
      return list
    },

    filterData: function (data, field) {
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
    },

    searchData: function (data, keyword) {
      return data.reduce(function (prev, elem) {
        var res = elem.course.indexOf(keyword)
        if (res !== -1) {
          prev.push(elem)
        }
        return prev
      }, [])
    },

    initCourseList: function () {
      courseCardList.innerHTML = this.makeList(courseData)
    },

    restoreList: function () {
      courseCardList.innerHTML = this.makeList(courseData)
      this.changeTabCurrent(courseTabLks[0])
    },

    changeTabCurrent: function (currentDom) {
      for (var i = 0; i < courseTabLksLen; i++) {
        item = courseTabLks[i]
        item.className = 'course-tab-lk'
      }
      currentDom.className += ' current'
    },

    showTips: function (text) {
      return '<div class="course-card-text"><span>' + text + '</span></div>'
    }
  }
})(document)

;(function (doc) {
  var oSearchInput = doc.getElementById('js-search-input'),
    oCourseTabList = doc.getElementsByClassName('js-course-tab-list')[0]

  var init = function () {
    initCourseTab.initCourseList()
    bindEvent()
  }

  function bindEvent() {
    oSearchInput.addEventListener('input', initCourseTab.searchCourse.bind(initCourseTab), false)
    oCourseTabList.addEventListener('click', initCourseTab.tabClick.bind(initCourseTab), false)
  }

  init()
})(document)
