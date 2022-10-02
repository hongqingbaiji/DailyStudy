;(function (node) {
  var TodoList = function () {
    var _self = this

    this.node = node
    this.inputIsShow = false
    this.curIndex = null
    this.isEditing = false

    // 配置默认参数
    this.dConfig = {
      showInput: '',
      inputWrap: '',
      addItem: '',
      list: '',
      itemClass: ''
    }
    // 缓存下this.getConfig() 获取到的配置项
    this.config = this.getConfig()
    this.itemClass = this.config.itemClass

    // 查看获取过来的配置项是否满足配置默认参数要求，如果配置项错误，抛出错误信息
    for (var key in this.dConfig) {
      if (!this.config.hasOwnProperty(key)) {
        console.log(errorInfo(key))
        return
      }
    }
    this.setConfig()

    // showInput事件
    addEvent(this.showInput, 'click', function () {
      _self.inputShow.call(_self)
    })

    // addItem事件
    addEvent(this.addItem, 'click', function () {
      _self.addItemFn.call(_self)
    })

    // 编辑和删除事件  事件委托
    addEvent(this.oList, 'click', function (e) {
      var e = e || window.event,
        tar = e.target || e.srcElement

      _self.listClick.call(_self, tar)
    })
  }

  TodoList.prototype = {
    getConfig: function () {
      return JSON.parse(this.node.getAttribute('data-config'))
    },

    setConfig: function () {
      var config = this.config,
        node = this.node

      this.showInput = node.getElementsByClassName('j-show-input')[0]
      this.inputWrap = node.getElementsByClassName('input-wrap')[0]
      this.addItem = this.inputWrap.getElementsByClassName('j-add-item')[0]
      this.oList = node.getElementsByClassName('j-list')[0]
      this.textInput = document.getElementById('textInput')
      this.listWrap = this.oList.parentNode
      // console.log(this)
    },

    // inputShow方法
    inputShow: function () {
      var _self = this,
        oLis = this.oList.getElementsByClassName('item')

      if (this.inputIsShow) {
        setInputShow.call(_self, 'close')
      } else {
        setInputShow.call(_self, 'open')
      }
      setInputStatus.apply(_self, [oLis, null, 'add'])
    },

    //addItem方法
    addItemFn: function () {
      var inputValue = this.textInput.value,
        inputValueLen = inputValue.length,
        oLis = this.oList.getElementsByClassName('item'),
        oLisLen = oLis.length,
        oLisItem,
        oLisItemText,
        editItem,
        _self = this

      if (inputValueLen <= 0) {
        alert('您想要记录些什么呢？')
        return
      }

      // 判断新增是否重复
      if (oLisLen > 0) {
        for (var i = 0; i < oLisLen; i++) {
          oLisItem = oLis[i]
          oLisItemText = elemChildren(oLisItem)[0].innerText
          if (oLisItemText === inputValue) {
            alert('该项目已存在')
            return
          }
        }
      }

      // 判断是否处于编辑状态
      if (this.isEditing) {
        editItem = elemChildren(oLis[this.curIndex])[0]
        editItem.innerText = this.textInput.value
      } else {
        var oLi = document.createElement('li')
        oLi.className = this.itemClass
        oLi.innerHTML = itemTpl(inputValue)
        this.oList.insertBefore(oLi, elemChildren(this.oList)[0])
      }
      setInputShow.call(_self, 'close')
      setInputStatus.apply(_self, [oLis, null, 'add'])
    },

    //编辑和删除事件 listClick
    listClick: function (tar) {
      var _self = this,
        tarClassName = tar.className,
        tarParent = tar.parentNode.parentNode,
        oLis = this.oList.getElementsByClassName('item')

      if (tarClassName === 'btn-edit iconfont icon-icon-edit') {
        // 点击的是编辑按钮

        setInputShow.call(_self, 'open')
        setInputStatus.apply(_self, [oLis, tarParent, 'edit'])
      } else if (tarClassName === 'btn-remove iconfont icon-guanbi1') {
        // 点击的是删除按钮
        tarParent.remove()
        setInputShow.call(_self, 'close')
        setInputStatus.apply(_self, [oLis, null, 'add'])
      }
    }
  }

  //配置输入框的展示和隐藏
  function setInputShow(action) {
    if (action === 'open') {
      this.inputWrap.style.display = 'block'
      this.listWrap.style.marginTop = '40px'
      this.textInput.focus()
      this.inputIsShow = true
    } else if (action === 'close') {
      this.inputWrap.style.display = 'none'
      this.listWrap.style.marginTop = '0px'
      this.textInput.value = ''
      this.inputIsShow = false
      this.addItem.innerHTML = '新增项目'
      this.isEditing = false
    }
  }

  // 配置input是编辑还是新增
  function setInputStatus(oItems, target, status) {
    var oItemsLen = oItems.length,
      oItemsItem
    if (status === 'edit') {
      var tarIndex = Array.prototype.indexOf.call(oItems, target),
        text = elemChildren(target)[0].innerText
      this.textInput.value = text
      this.addItem.innerHTML = '编辑第' + (tarIndex + 1) + '项'
      this.isEditing = true
      this.curIndex = tarIndex

      for (var i = 0; i < oItemsLen; i++) {
        oItemsItem = oItems[i]
        oItemsItem.className = 'item'
      }
      target.className += ' active'
    } else if (status === 'add') {
      for (var i = 0; i < oItemsLen; i++) {
        oItemsItem = oItems[i]
        oItemsItem.className = 'item'
        this.addItem.innerHTML = '新增项目'
        this.isEditing = false
        this.curIndex = null
      }
    }
  }

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

  // 配置项错误函数
  function errorInfo(key) {
    return new Error(
      '您没有配置参数：' +
        key +
        '\n' +
        ' 必须配置的参数列表如下: \n' +
        '1. 打开输入框按钮元素类名: showInput\n' +
        '2. 输入框区域元素类名: inputWrap\n' +
        '3. 增加项目按钮元素类名: addItem\n' +
        '4. 列表承载元素类名: list\n' +
        '5. 列表项承载元素类名: itemClass'
    )
  }

  new TodoList()
})(document.getElementsByClassName('wrap')[0])
