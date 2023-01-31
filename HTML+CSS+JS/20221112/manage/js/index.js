;(function (doc) {
  var oNav = doc.getElementsByClassName('J_nav')[0],
    oNavItems = oNav.getElementsByClassName('nav-item'),
    oSearchRow = doc.getElementsByClassName('J_searchRow')[0],
    oTipRow = doc.getElementsByClassName('J_tipRow')[0],
    oCourseList = doc.getElementsByClassName('J_courseList')[0],
    oSearchInput = doc.getElementById('J_searchInput'),
    oPageBtnRow = doc.getElementsByClassName('J_pageBtnRow')[0],
    oPageBtnList = doc.getElementsByClassName('J_pageBtnList')[0],
    oBtnItems = oPageBtnList.getElementsByClassName('btn-item'),
    listItemTpl = doc.getElementById('J_listItemTpl').innerHTML,
    pageBtnItemTpl = doc.getElementById('J_pageBtnItemTpl').innerHTML

  var oNavItemsLen = oNavItems.length,
    field = 'manage',
    pageNum = 0

  var APIs = {
    getCourseList: 'http://localhost/api_for_study/List/getCourseListForManage',
    getSearchList: 'http://localhost/api_for_study/List/getSearchListForManage'
  }

  var init = function () {
    getCourseList(field, pageNum)
    bindEvent()
  }

  function bindEvent() {
    oNav.addEventListener('click', navClick, false)
    oSearchInput.addEventListener('input', throttle(courseSearch, 1000), false)
    oPageBtnList.addEventListener('click', changePage, false)
  }

  // 切换列表项
  function navClick(e) {
    var e = e || window.event,
      tar = e.target || e.srcElement,
      className = tar.className

    if (className === 'nav-lk') {
      var oParent = tar.parentNode,
        item

      field = oParent.getAttribute('data-field')

      for (var i = 0; i < oNavItemsLen; i++) {
        item = oNavItems[i]
        item.className = 'nav-item'
      }
      oParent.className += ' active'

      if (field === 'search') {
        showWarningTip(true)
        showSearchRow(true)
        showPageBtn(false)
        return
      } else {
        showSearchRow(false)
        pageNum = 0
        getCourseList(field, pageNum)
      }
    }
  }

  // 获取课程列表
  function getCourseList(field, pageNum) {
    xhr.ajax({
      url: APIs.getCourseList,
      type: 'POST',
      dataType: 'JSON',
      data: {
        field: field,
        pageNum: pageNum
      },
      success: function (data) {
        var res = data.res,
          pageCount = data.pages

        _setDatas(field, res, pageCount, pageNum)
      },
      error: function () {}
    })
  }

  // 渲染列表
  function renderList(listField, data) {
    var list = ''
    data.forEach(function (elem) {
      list += listItemTpl.replace(/{{(.*?)}}/g, function (node, key) {
        return {
          id: elem.id,
          course: elem.course,
          hour: elem.hour,
          teacher: elem.teacher,
          field: elem.field,
          type: listField === 'trash' ? 'regain' : 'delete',
          typeText: listField === 'trash' ? '恢复' : '删除'
        }[key]
      })
    })
    return list
  }

  // 搜索事件
  function courseSearch() {
    var val = trimSpace(this.value),
      valLen = val.length

    if (valLen > 0) {
      getSearchList(val)
    } else {
      showWarningTip(true)
    }
  }

  // 获取搜索列表
  function getSearchList(keyword) {
    xhr.ajax({
      url: APIs.getSearchList,
      type: 'POST',
      dataType: 'JOSN',
      data: {
        keyword: keyword
      },
      success: function (data) {
        var res = data.res,
          pageCount = data.pages

        _setDatas('manage', res)
      },
      error: function () {}
    })
  }

  // 提取函数, 获取数据来渲染列表
  function _setDatas(field, data, pageCount, pageNum) {
    if (data && data.length > 0) {
      showWarningTip(false)
      oCourseList.innerHTML = renderList(field, data)

      if (pageCount > 1 && field != 'search') {
        oPageBtnList.innerHTML = renderPageBtns(pageCount, pageNum)
        showPageBtn(true)
      } else {
        oPageBtnList.innerHTML = ''
        showPageBtn(false)
      }
    } else {
      showWarningTip(true)
    }
  }

  // 渲染分页按钮
  function renderPageBtns(pageCount, pageNum) {
    var list = ''

    for (var i = 0; i < pageCount; i++) {
      list += pageBtnItemTpl.replace(/{{(.*?)}}/g, function (node, key) {
        return {
          pageNum: i + 1,
          isCur: i === pageNum && 'cur'
        }[key]
      })
    }

    return list
  }

  // 切换分页按钮
  function changePage(e) {
    var e = e || window.event,
      tar = e.target || e.srcElement,
      className = tar.className

    if (className === 'page-btn') {
      var oParent = tar.parentNode,
        thisIdx = [].indexOf.call(oBtnItems, oParent),
        oBtnItemsLen = oBtnItems.length,
        item

      for (var i = 0; i < oBtnItemsLen; i++) {
        item = oBtnItems[i]
        item.className = 'btn-item'
      }
      oParent.className += ' cur'
      getCourseList(field, thisIdx)
    }
  }

  // 展示错误信息
  function showWarningTip(show) {
    if (show) {
      oTipRow.className += ' show'
      oCourseList.innerHTML = ''
    } else {
      oTipRow.className = 'tip-row J_tipRow'
    }
  }

  // 展示搜索框
  function showSearchRow(show) {
    if (show) {
      oSearchRow.className += ' show'
    } else {
      oSearchRow.className = 'search-row J_searchRow'
    }
  }

  // 展示分页按钮
  function showPageBtn(show) {
    if (show) {
      oPageBtnRow.className += ' show'
    } else {
      oPageBtnRow.className = 'page-btn-row J_pageBtnRow'
    }
  }

  init()
})(document)
