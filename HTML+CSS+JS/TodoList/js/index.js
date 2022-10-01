init()

function init() {
  initTodoList
}

var initTodoList = (function () {
  var showInput = document.getElementsByClassName('j-show-input')[0],
    inputWrap = document.getElementsByClassName('input-wrap')[0],
    textInput = document.getElementById('textInput'),
    addItem = document.getElementsByClassName('j-add-item')[0],
    listWrap = document.getElementsByClassName('list-wrap')[0],
    oList = document.getElementsByClassName('j-list')[0],
    inputIsShow = false,
    isEdit = false,
    curIndex = null

  //showInpt事件
  addEvent(showInput, 'click', function () {
    if (inputIsShow) {
      // 因为input的状态在该项目中常用，就封装成函数了
      resetInputStatus('close')
    } else {
      resetInputStatus('open')
    }
  })

  //addItem事件
  addEvent(addItem, 'click', function () {
    var inputValue = textInput.value,
      inputValueLen = inputValue.length,
      oLis = document.getElementsByClassName('item'),
      oLisLen = oLis.length,
      oLisItem,
      oLisItemText,
      editItem

    // 没有输入内容时的提示
    if (inputValueLen === 0) {
      alert('您想要记录点什么呢？')
      return
    }
    // 输入的内容重复的提示
    for (var i = 0; i < oLisLen; i++) {
      oLisItem = oLis[i]
      oLisItemText = elemChildren(oLisItem)[0].innerText
      if (inputValue.trim() === oLisItemText.trim()) {
        alert('该项目已存在！')
        return
      }
    }

    if (isEdit) {
      editItem = elemChildren(oLis[curIndex])[0]
      editItem.innerText = textInput.value
    } else {
      var oLi = document.createElement('li')
      oLi.className = 'item'
      oLi.innerHTML = itemTpl(inputValue)
      oList.insertBefore(oLi, elemChildren(oList)[0])
    }
    // 新增项目后，把input的状态复原
    resetInputStatus('close')
  })

  //编辑和删除事件
  // 由于编辑和删除事件都在新增项中，所以要使用事件委托
  addEvent(oList, 'click', function (e) {
    var e = e || window.event,
      tar = e.target || e.srcElement,
      tarParent = tar.parentNode.parentNode,
      className = tar.className,
      tarParentValue = elemChildren(tarParent)[0].innerText,
      tarIndex

    if (className === 'btn-edit iconfont icon-icon-edit') {
      isEdit = true
      textInput.value = tarParentValue
      // 获取当前编辑项的下标
      // Array.prototype.indexOf.call(要查询的数组（当前项所在的数组）, 当前项)
      tarIndex = Array.prototype.indexOf.call(elemChildren(oList), tarParent)
      // 把下标同步到全局去
      curIndex = tarIndex
      addItem.innerHTML = '编辑第' + (curIndex + 1) + '项'
      // 点击编辑 把input 打开
      resetInputStatus('open')
    } else if (className === 'btn-remove iconfont icon-guanbi1') {
      tarParent.remove()
      // 删除的时候把input关掉
      resetInputStatus('close')
    }
  })

  // 新增项
  function itemTpl(text) {
    return (
      '<p class="item-content">' +
      text +
      '</p>' +
      '<div class="btn-group">' +
      '<a href="javascript:;" class="btn-edit iconfont icon-icon-edit"></a>' +
      '<a href="javascript:;" class="btn-remove iconfont icon-guanbi1"></a>' +
      '</div>'
    )
  }

  function resetInputStatus(status) {
    if (status === 'close') {
      inputWrap.style.display = 'none'
      textInput.value = ''
      listWrap.style.marginTop = '0px'
      inputIsShow = false
      addItem.innerHTML = '增加项目'
      isEdit = false
    } else if (status === 'open') {
      inputWrap.style.display = 'block'
      listWrap.style.marginTop = '40px'
      textInput.focus()
      inputIsShow = true
    }
  }
})()
