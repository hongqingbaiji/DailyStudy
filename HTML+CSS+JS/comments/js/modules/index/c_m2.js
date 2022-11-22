var initCommentModule = (function (doc) {
  var oCommentEditBoard = doc.getElementsByClassName('J_commentEditBoard')[0],
    oStarItems = doc.getElementsByClassName('J_hoverStar'),
    oStarTip = doc.getElementsByClassName('J_starTip')[0],
    oEditTxt = doc.getElementsByClassName('J_editTxt')[0],
    oTxtCount = doc.getElementsByClassName('J_txtCount')[0],
    oSubmitBtn = doc.getElementsByClassName('J_submitBtn')[0],
    oRadioTabItems = doc.getElementsByClassName('tab-radio'),
    oLoading = doc.getElementsByClassName('J_loading')[0],
    oCommentList = doc.getElementsByClassName('J_commentList')[0],
    oStatisticsNum = doc.getElementsByClassName('J_statisticsNum')[0],
    warningTip = doc.getElementById('J_warningTip').innerHTML,
    oItemTpl = doc.getElementById('J_itemTpl').innerHTML,
    starNum = 5,
    t = null,
    delayTime = 500,
    fieldId = 0,
    pageNum = 0

  var APIs = {
    submitComment: 'http://localhost/api_for_study/Comment/submitComment',
    getComments: 'http://localhost/api_for_study/Comment/getComments'
  }

  return {
    openBoard: function () {
      oCommentEditBoard.style.display = 'block'
    },

    closeBoard: function () {
      oCommentEditBoard.style.display = 'none'
      this._restoreBoardStatus()
    },

    //选择评分，及评分语的展示
    starsHover: function (e) {
      var e = e || window.event,
        tar = e.target || e.srcElement,
        tagName = tar.tagName.toLowerCase()

      if (tagName === 'i') {
        var thisIdx = [].indexOf.call(oStarItems, tar),
          thisStarItem = oStarItems[thisIdx],
          len = oStarItems.length,
          item

        oStarTip.innerHTML = thisStarItem.getAttribute('data-title')
        starNum = thisStarItem.getAttribute('data-count')

        for (var i = 0; i < len; i++) {
          item = oStarItems[i]
          if (i <= thisIdx) {
            if (item.className.indexOf('active') === -1) {
              item.className += ' active'
            }
          } else {
            item.className = 'fa fa-star J_hoverStar'
          }
        }
      }
    },

    // 输入文本后，字数和提交按钮的展示状态
    editInput: function () {
      var val = trimSpace(oEditTxt.value),
        valLen = val.length

      oTxtCount.innerHTML = valLen

      if (valLen >= 15 && valLen < 1000) {
        this.submitBtnChange({
          txtChange: false,
          isDisabled: false
        })
      } else {
        this.submitBtnChange({
          txtChange: false,
          isDisabled: true
        })
      }
    },

    // 获取数据库中的评论相关数据
    getComments: function (opt) {
      var _self = this,
        fieldId = opt.fieldId,
        pageNum = opt.pageNum

      xhr.ajax({
        url: APIs.getComments,
        type: 'POST',
        data: {
          field: fieldId,
          page: pageNum
        },
        success: function (data) {
          var num = data.num,
            data = data.res,
            len = data.length

          oLoading.style.display = 'block'

          t = setTimeout(function () {
            _self.setTabStarNum(num)
            oCommentList.innerHTML = ''
            oLoading.style.display = 'none'
            clearTimeout(t)

            if (len <= 0) {
              _self.setWarningTip('暂无评论')
              return
            }

            oCommentList.appendChild(_self.renderList(data))
          }, delayTime)
        },
        error: function () {
          _self.setWarningTip('获取评论列表失败')
        }
      })
    },

    // 点击提交评论，提交ajax
    submitComment: function (userId) {
      var val = oEditTxt.value,
        len = trimSpace(val).length,
        _self = this

      if (len >= 15 && len < 1000) {
        xhr.ajax({
          type: 'POST',
          url: APIs.submitComment,
          data: {
            userId: userId,
            starNum: starNum,
            comment: val
          },
          success: function (data) {
            var errorCode = data.error_code,
              oFirstCommentItem = oCommentList.getElementsByClassName('comment-item')[0]

            _self.submitBtnChange({
              txtChange: true,
              isDisabled: true
            })

            t = setTimeout(function () {
              _self.submitBtnChange({
                txtChange: false,
                isDisabled: false
              })
              clearTimeout(t)

              if (errorCode === '10010') {
                alert('您已经对该课程做了评价，感谢您！')
                return
              }

              if (oFirstCommentItem) {
                oCommentList.insertBefore(_self._makeItem(data.res), oFirstCommentItem)
              } else {
                oCommentList.innerHTML = ''
                oCommentList.appendChild(_self._makeItem(data.res))
              }

              _self._restoreBoardStatus()
              _self.setTabStarNum(data.num)
              _self.closeBoard()
            }, delayTime)
          },
          error: function () {
            alert('对不起，提交评论失败，请重试')
          }
        })
      }
    },

    // 渲染列表
    renderList: function (data) {
      var frag = document.createDocumentFragment(),
        _self = this

      data.forEach(function (elem) {
        frag.appendChild(_self._makeItem(elem))
      })

      return frag
    },

    // 新增评论
    _makeItem: function (data) {
      var dom = document.createElement('div'),
        starNum = data.star_num,
        count = 0,
        ts = data.uptime

      dom.className = 'comment-item'

      dom.innerHTML = oItemTpl.replace(/{{(.*?)}}/gim, function (node, key) {
        key === 'isActive' && count++

        return {
          avatar: 'img/' + data.avatar,
          nickname: data.nickname,
          comment: data.comment,
          isActive: count <= starNum ? 'active' : '',
          uptime: getDateTime(ts, 'dateTime')
        }[key]
      })

      return dom
    },

    // 还原评论界面的状态
    _restoreBoardStatus: function () {
      var len = oStarItems.length,
        item
      for (var i = 0; i < len; i++) {
        item = oStarItems[i]
        item.className += ' active'
      }
      oStarTip.innerHTML = oStarItems[len - 1].getAttribute('data-title')
      oEditTxt.value = ''
      oTxtCount.innerHTML = '0'
      oSubmitBtn.innerHTML = '提交评论'
      this.submitBtnChange({
        txtChange: false,
        isDisabled: true
      })
    },

    // 切换评论列表
    radioTabClick: function (e) {
      var e = e || window.event,
        tar = e.target || e.srcElement,
        className = tar.className

      if (className === 'radio-icon' || className === 'radio-count') {
        var oParent = tar.parentNode,
          tabLen = oRadioTabItems.length,
          tabItem

        fieldId = oParent.getAttribute('data-id')

        for (var i = 0; i < tabLen; i++) {
          tabItem = oRadioTabItems[i]
          tabItem.className = 'tab-radio'
        }
        oParent.className += ' cur'
        this.getComments({
          fieldId: fieldId,
          pageNum: pageNum
        })
      }
    },

    // 提交评论按钮的状态
    submitBtnChange: function (opt) {
      var txtChange = opt.txtChange,
        isDisabled = opt.isDisabled

      oSubmitBtn.innerHTML = txtChange ? '<i class="fa fa-spinner fa-spin"></i>' : '提交评论'

      if (isDisabled) {
        oSubmitBtn.className += ' disabled'
        oSubmitBtn.setAttribute('disabled', 'disabled')
      } else {
        oSubmitBtn.className = 'comment-btn submit J_submitBtn'
        oSubmitBtn.removeAttribute('disabled')
      }
    },

    // 获取评论数
    setTabStarNum: function (arr) {
      var oRadioCount = null

      arr.forEach(function (elem, idx) {
        oRadioCount = oRadioTabItems[idx].getElementsByClassName('radio-count')[0]
        oRadioCount.innerHTML = elem
      })

      oStatisticsNum.innerHTML = arr[0] != '0' ? Math.ceil((arr[1] / arr[0]) * 100) + '%' : '-'
    },

    // 暂无评论提示
    setWarningTip: function (text) {
      oCommentList.innerHTML = warningTip.replace(/{{(.*?)}}/gim, text)
    }
  }
})(document)
