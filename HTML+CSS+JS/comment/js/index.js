;(function (doc, Comment) {
  var oOpenBtn = doc.getElementsByClassName('J_openBtn')[0],
    oCloseBtn = doc.getElementsByClassName('J_closeBtn')[0],
    oStars = doc.getElementsByClassName('J_stars')[0],
    oEditTxt = doc.getElementsByClassName('J_editTxt')[0],
    oSubmitBtn = doc.getElementsByClassName('J_submitBtn')[0]

  var userId = 1

  var init = function () {
    bindEvent()
  }

  function bindEvent() {
    oOpenBtn.addEventListener('click', Comment.openBoard, false)
    oCloseBtn.addEventListener('click', Comment.closeBoardm, false)
    oStars.addEventListener('mouseover', Comment.starsHover, false)
    oEditTxt.addEventListener('input', Comment.editInput, false)
    oSubmitBtn.addEventListener('click', Comment.submitComment.bind(Comment, userId), false)
  }

  init()
})(document, initCommentModule)
