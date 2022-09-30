var backTop = document.getElementsByClassName('backTop')[0],
  header = document.getElementsByClassName('list-hd')[0]

addEvent(window, 'scroll', function () {
  var sTop = getScrollOffset().top
  sTop >= 300 ? (backTop.style.display = 'block') : (backTop.style.display = 'none')
})
addEvent(backTop, 'click', function () {
  window.scrollTo(0, 0)
})
addEvent(header, 'click', function () {
  window.scrollTo(0, 0)
})
