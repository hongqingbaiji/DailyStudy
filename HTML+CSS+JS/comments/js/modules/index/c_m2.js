var initCommentModule = (function (doc) {
  var oCommentEditBoard = doc.getElementsByClassName('J_commentEditBoard')[0],
    oStarItems = doc.getElementsByClassName('fa-star'),
    oStarTip = doc.getElementsByClassName('J_starTip')[0],
    oTxtCount = doc.getElementsByClassName('J_txtCount')[0],
    oSubmitBtn = doc.getElementsByClassName('J_submitBtn')[0],
    oEditTxt = doc.getElementsByClassName('J_editTxt')[0],
    oRadioTabItems = doc.getElementsByClassName('tab-radio'),
    oLoading = doc.getElementsByClassName('J_loading')[0],
    oCommentList = doc.getElementsByClassName('J_commentList')[0],
    warningTip = doc.getElementById('J_warningTip').innerHTML,
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
    },

    //选择评分，及评分语的展示
    starsHover: function (e) {
      var e = e || window.event,
        tar = e.target || e.srcElement,
        tagName = tar.tagName.toLowerCase()

      if (tagName === 'i') {
        var thisIdx = [].indexOf.call(oStarItems, tar),
          len = oStarItems.length,
          thisStarItem = oStarItems[thisIdx],
          item

        starNum = thisStarItem.getAttribute('data-count')
        oStarTip.innerHTML = thisStarItem.getAttribute('data-title')

        for (var i = 0; i < len; i++) {
          item = oStarItems[i]
          i <= thisIdx ? (item.className += ' active') : (item.className = 'fa fa-star')
        }
      }
    },

    // 输入文本后，字数和提交按钮的展示状态
    editInput: function () {
      var val = trimSpace(oEditTxt.value),
        valLen = val.length

      oTxtCount.innerHTML = valLen

      if (valLen >= 15 && valLen < 1000) {
        this.submitBtnStatusChange(true)
      } else {
        this.submitBtnStatusChange(false)
      }
    },

    // 获取数据库中的评论相关数据
    getComments: function (fieldId, pageNum) {
      var _self = this

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
              _self._setWarningTip('暂无评论')
              return
            }
          }, delayTime)
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
          url: APIs.submitComment,
          type: 'POST',
          data: {
            userId: userId,
            starNum: starNum,
            comment: val
          },
          success: function (data) {
            var errorCode = data.error_code

            _self.submitBtnTxtChange(true)

            t = setTimeout(function () {
              _self.submitBtnTxtChange(false)
              clearTimeout(t)

              if (errorCode === '10010') {
                alert('您已经对该课程做了评价，谢谢！')
                _self.restoreBoardStatus()
                return
              }

              _self.setTabStarNum(data.num)
              _self.restoreBoardStatus()
            }, delayTime)
          }
        })
      }
    },

    // 重置评论窗口
    restoreBoardStatus: function () {
      var item

      oEditTxt.value = ''
      oTxtCount.innerHTML = '0'
      oSubmitBtn.innerHTML = '提交评论'
      for (var i = 0; i < 5; i++) {
        item = oStarItems[i]
        item.className += ' active'
      }
      oStarTip.innerHTML = '五星好评！课程非常棒，点赞！'
      this.submitBtnStatusChange(false)
      this.closeBoard()
    },

    // 点击切换不同评分的评论页
    radioTabClick: function (e) {
      var e = e || window.event,
        tar = e.target || e.srcElement,
        className = tar.className

      if (className === 'radio-icon' || className === 'radio-txt') {
        var oParent = tar.parentNode,
          tabLen = oRadioTabItems.length,
          tabItem

        fieldId = oParent.getAttribute('data-id')

        for (var i = 0; i < tabLen; i++) {
          tabItem = oRadioTabItems[i]
          tabItem.className = 'tab-radio'
        }
        oParent.className += ' cur'
        this.getComments(fieldId, pageNum)
      }
    },

    // 提交按钮点击后的加载中状态
    submitBtnTxtChange: function (isChange) {
      if (isChange) {
        oSubmitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i>'
        this.submitBtnStatusChange(false)
      } else {
        oSubmitBtn.innerHTML = '提交评论'
        this.submitBtnStatusChange(true)
      }
    },

    // 提交按钮的点击状态
    submitBtnStatusChange: function (isChange) {
      if (isChange) {
        oSubmitBtn.className = 'comment-btn submit J_submitBtn'
        oSubmitBtn.removeAttribute('disabled')
      } else {
        oSubmitBtn.className += ' disabled'
        oSubmitBtn.setAttribute('disabled', 'disabled')
      }
    },

    // 获取评论数
    setTabStarNum: function (arr) {
      var oRadioCount = null

      arr.forEach(function (elem, idx) {
        oRadioCount = oRadioTabItems[idx].getElementsByClassName('radio-count')[0]
        oRadioCount.innerHTML = elem
      })
    },

    _setWarningTip: function (text) {
      oCommentList.innerHTML = warningTip.replace(/{{(.*?)}}/gim, text)
    }
  }
})(document)
