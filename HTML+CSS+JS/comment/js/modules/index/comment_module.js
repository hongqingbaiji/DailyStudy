var initCommentModule = (function (doc) {
  var oCommentEditBoard = doc.getElementsByClassName('J_commentEditBoard')[0],
    oStarTip = doc.getElementsByClassName('J_starTip')[0],
    oStarItems = doc.getElementsByClassName('fa-star'),
    oTxtCount = doc.getElementsByClassName('J_txtCount')[0],
    oSubmitBtn = doc.getElementsByClassName('J_submitBtn')[0],
    oEditTxt = doc.getElementsByClassName('J_editTxt')[0],
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
    starsHover: function (e) {
      var e = e || window.event,
        tar = e.target || e.srcElement,
        tagName = tar.tagName.toLowerCase()

      if (tagName === 'i') {
        var thisIdx = [].indexOf.call(oStarItems, tar),
          len = oStarItems.length,
          item

        oStarTip.innerHTML = tar.getAttribute('data-title')
        starNum = tar.getAttribute('data-count')

        for (var i = 0; i < len; i++) {
          item = oStarItems[i]
          i <= thisIdx ? (item.className += ' active') : (item.className = 'fa fa-star')
        }
      }
    },
    editInput: function () {
      var val = tools.trimSpace(oEditTxt.value),
        valLen = val.length

      oTxtCount.innerText = valLen

      if (valLen >= 15 && valLen < 1000) {
        oSubmitBtn.className = 'comment-btn submit J_submitBtn'
        oSubmitBtn.removeAttribute('disabled')
      } else {
        oSubmitBtn.className += ' disabled'
        oSubmitBtn.setAttribute('disabled', 'disabled')
      }
    },
    submitComment: function (userId) {
      var val = oEditTxt.value,
        len = tools.trimSpace(val).length

      if (len >= 15 && len <= 1000) {
        tools.xhr.ajax({
          url: APIs.submitComment,
          type: 'POST',
          data: {
            userId: userId,
            starNum: starNum,
            comment: val
          },
          success: function (data) {
            var errorCode = data.error_code

            t = setTimeout(function () {}, delayTime)
          }
        })
      }
    },
    submitBtnTxtChange: function (isChange) {
      if (isChange) {
        oSubmitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i>'
      } else {
        oSubmitBtn.innerHTML = '提交评论'
      }
    }
  }
})(document)
