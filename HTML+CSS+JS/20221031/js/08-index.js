;(function (doc) {
  var data = JSON.parse(doc.getElementById('J_data').innerHTML),
    oTpl = doc.getElementById('J_courseItemTpl').innerHTML,
    oFilterList = doc.getElementsByClassName('J_filterList')[0],
    oFilterItems = doc.getElementsByClassName('J_filterItem'),
    oCourseList = doc.getElementsByClassName('J_courseList')[0],
    oFilterItemsLen = oFilterItems.length,
    sortData = tools.sortDatas(data.course_field, data.course_data)('field', 'multi')

  var init = function () {
    renderList(sortData, 7)
    bindEvent()
  }

  function bindEvent() {
    oFilterList.addEventListener('click', navClick, false)
  }

  function renderList(data, sort) {
    var list = '',
      sortData = data[sort]

    sortData.forEach(function (course) {
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
        item,
        sort = oParent.getAttribute('data-sort')
      for (var i = 0; i < oFilterItemsLen; i++) {
        item = oFilterItems[i]
        item.className = 'J_filterItem filter-item'
      }
      oParent.className += ' cur'

      renderList(sortData, sort)
    }
  }

  init()
})(document)
