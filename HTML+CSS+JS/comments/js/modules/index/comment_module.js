var initCommentModule = (function (doc) {
  var oCommentEditBoard = doc.getElementsByClassName('J_commentEditBoard')[0],
    oStarTip = doc.getElementsByClassName('J_starTip')[0],
    oStarItems = doc.getElementsByClassName('fa-star'),
    oEditTxt = doc.getElementsByClassName('J_editTxt')[0],
    oTxtCount = doc.getElementsByClassName('J_txtCount')[0],
    oSubmitBtn = doc.getElementsByClassName('J_submitBtn')[0],
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

    starsHover: function (e) {
      var e = e || window.event,
        tar = e.target || e.srcElement,
        tagName = tar.tagName.toLowerCase()

      if (tagName === 'i') {
        var thisIdx = [].indexOf.call(oStarItems, tar),
          len = oStarItems.length,
          thisStarItem = oStarItems[thisIdx],
          item

        oStarTip.innerHTML = thisStarItem.getAttribute('data-title')
        starNum = thisStarItem.getAttribute('data-count')

        for (var i = 0; i < len; i++) {
          item = oStarItems[i]
          i <= thisIdx ? (item.className += ' active') : (item.className = 'fa fa-star')
        }
      }
    },

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
            oLoading.style.display = 'none'
            oCommentList.innerHTML = ''
            clearTimeout(t)

            if (len <= 0) {
              _self._setWarningTip('暂无评论')
              return
            }
          }, delayTime)
        }
      })
    },

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
            console.log(data)
            var errorCode = data.error_code

            _self.submitBtnTxtChange(true)

            t = setTimeout(function () {
              _self.submitBtnTxtChange(false)
              clearTimeout(t)

              if (errorCode === '10010') {
                alert('您已经对该课程做了评价，感谢您！')
                return
              }
              _self.setTabStarNum(data.num)
              _self.restoreBoardStatus()
            }, delayTime)
          }
        })
      }
    },

    restoreBoardStatus: function () {
      oEditTxt.value = ''
      oTxtCount.innerHTML = 0
      oSubmitBtn.innerHTML = '提交评论'
      this.submitBtnStatusChange(false)
      this.closeBoard()
    },

    radioTabClick: function (e) {
      var e = e || window.event,
        tar = e.target || e.srcElement,
        className = tar.className

      if (className === 'radio-icon' || className === 'radio-txt') {
        var oParent = tar.parentNode,
          tabLen = oRadioTabItems.length,
          tabItem

        fieldId = oParent.getAttribute('data-id')

        console.log(tar, fieldId)

        for (var i = 0; i < tabLen; i++) {
          tabItem = oRadioTabItems[i]
          tabItem.className = 'tab-radio'
        }
        oParent.className += ' cur'
        this.getComments(fieldId, pageNum)
      }
    },

    submitBtnTxtChange: function (isChange) {
      if (isChange) {
        oSubmitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i>'
        this.submitBtnStatusChange(false)
      } else {
        oSubmitBtn.innerHTML = '提交评论'
        this.submitBtnStatusChange(true)
      }
    },

    submitBtnStatusChange: function (isChange) {
      if (isChange) {
        oSubmitBtn.className = 'comment-btn submit J_submitBtn'
        oSubmitBtn.removeAttribute('disabled')
      } else {
        oSubmitBtn.className += ' disabled'
        oSubmitBtn.setAttribute('disabled', 'disabled')
      }
    },

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
