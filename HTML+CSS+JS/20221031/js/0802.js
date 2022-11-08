;(function (doc) {
  var data = JSON.parse(doc.getElementById('J_data').innerHTML),
    oTpl = doc.getElementById('J_courseItemTpl').innerHTML,
    oCourseList = doc.getElementsByClassName('J_courseList')[0],
    oFilterList = doc.getElementsByClassName('J_filterList')[0],
    oFilterItems = oFilterList.getElementsByClassName('J_filterItem'),
    oFilterItemsLen = oFilterItems.length,
    oSortDatas = sortDatas(data.course_field, data.course_data)('field', 'multi')

  var init = function () {
    renderList(oSortDatas, 7)
    bindEvent()
  }

  function bindEvent() {
    oFilterList.addEventListener('click', navClick, false)
  }

  function renderList(data, sort) {
    var courseData = data[sort],
      list = ''
    courseData.forEach(function (course) {
      list += oTpl.replace(/{{(.*?)}}/g, function (node, key) {
        return {
          img: course.img,
          courseName: course.course,
          isFree: course.is_free === '1' ? 'free' : 'vip',
          price: course.is_free === '1' ? '免费' : '￥' + course.price + '.00',
          hours: course.classes
        }[key]
      })
    })
    oCourseList.innerHTML = list
  }

  function navClick(e) {
    var e = e || window.event,
      tar = e.target || e.srcElement,
      className = tar.className

    if (className === 'filter-lk') {
      var oParent = tar.parentNode,
        sort = oParent.getAttribute('data-sort'),
        item
      for (var i = 0; i < oFilterItemsLen; i++) {
        item = oFilterItems[i]
        item.className = 'J_filterItem filter-item'
      }
      oParent.className += ' cur'
      renderList(oSortDatas, sort)
    }
  }

  function sortDatas(sort, data) {
    var cache = {}

    return function (foreign_key, sortType) {
      if (sortType !== 'single' && sortType !== 'multi') {
        console.log(new Error('Invalid sort type.[only "single" and "multi" are valid values]'))
        return
      }

      sort.forEach(function (sortElem) {
        var _id = sortElem.id
        cache[_id] = []

        data.forEach(function (dataElem) {
          var foreign_val = dataElem[foreign_key]
          switch (sortType) {
            case 'single':
              if (foreign_val === _id) {
                cache[_id].push(dataElem)
              }
              break
            case 'multi':
              var _arr = foreign_val.split(',')
              _arr.forEach(function (_arrElem) {
                if (_arrElem === _id) {
                  cache[_id].push(dataElem)
                }
              })
              break
            default:
              break
          }
        })
      })
      return cache
    }
  }

  init()
})(document)
