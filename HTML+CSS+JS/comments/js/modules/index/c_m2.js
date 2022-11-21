var initCommentModule = (function (doc) {
  var oCommentEditBoard = doc.getElementsByClassName('J_commentEditBoard')[0],
    oStarItems = doc.getElementsByClassName('J_hoverStar'),
    oStarTip = doc.getElementsByClassName('J_starTip')[0],
    oEditTxt = doc.getElementsByClassName('J_editTxt')[0],
    oTxtCount = doc.getElementsByClassName('J_txtCount')[0],
    oSubmitBtn = doc.getElementsByClassName('J_submitBtn')[0],
    oRadioTabItems = doc.getElementsByClassName('tab-radio'),
    starNum = 5,
    t = null,
    delayTime = 500

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
          thisStarItem = oStarItems[thisIdx],
          len = oStarItems.length,
          item

        oStarTip.innerHTML = thisStarItem.getAttribute('data-title')
        starNum = thisStarItem.getAttribute('data-count')

        for (var i = 0; i < len; i++) {
          item = oStarItems[i]
          i <= thisIdx ? (item.className += ' active') : (item.className = 'fa fa-star J_hoverStar')
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

    getComments: function () {},

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
            console.log(data)

            var errorCode = data.error_code

            _self.submitBtnTxtChange(true)

            t = setTimeout(function () {
              _self.submitBtnTxtChange(false)

              if (errorCode === '10010') {
                alert('您已经对该课程做了评价，感谢您！')
                return
              }

              _self.setTabStarNum(data.num)
              _self.closeBoard()
              oEditTxt.value = ''
              clearTimeout(t)
            }, delayTime)
          }
        })
      }
    },

    radioTabClick: function (e) {
      var e = e || window.event,
        tar = e.target || e.srcElement,
        className = tar.className

      if (className === 'radio-icon' || className === 'radio-count') {
        var oParent = tar.parentNode,
          tabLen = oRadioTabItems.length,
          tabItem

        for (var i = 0; i < tabLen; i++) {
          tabItem = oRadioTabItems[i]
          tabItem.className = 'tab-radio'
        }
        oParent.className += ' cur'
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

    // 获取评论数
    setTabStarNum: function (arr) {
      var oRadioCount = null
      arr.forEach(function (elem, idx) {
        oRadioCount = oRadioTabItems[idx].getElementsByClassName('radio-count')[0]
        oRadioCount.innerHTML = elem
      })
    }
  }
})(document)
