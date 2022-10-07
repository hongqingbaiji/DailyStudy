window.onload = function () {
  init()
}
function init() {
  keySearch()
}

var keySearch = (function () {
  var autoKw = document.getElementById('J_autoKw'),
    searchKw = document.getElementById('J_search_kw'),
    recomKw = JSON.parse(document.getElementById('recomKw').innerHTML),
    Len = recomKw.length,
    timer = null,
    kwOrder = 0

  addEvent(searchKw, 'focus', function () {
    clearInterval(timer)
    autoKw.style.color = '#ccc'
  })
  addEvent(searchKw, 'input', function () {
    autoKwShow(this.value, false)
  })
  addEvent(searchKw, 'propertychange', function () {
    autoKwShow(this.value, false)
  })
  addEvent(searchKw, 'blur', function () {
    autoKwShow(this.value, true)
    timer = setInterval(autoKwChange, 2000)
  })

  function setAutoKws() {
    autoKwChange()
    timer = setInterval(autoKwChange, 2000)
  }
  function autoKwChange() {
    autoKw.innerHTML = recomKw[kwOrder]
    kwOrder = kwOrder >= Len - 1 ? 0 : kwOrder + 1
  }

  function autoKwShow(val, isBlur) {
    if (val.length <= 0) {
      autoKw.className = 'auto-kw show'
      autoKw.style.color = isBlur ? '#989898' : '#ccc'
    } else {
      autoKw.className = 'auto-kw hide'
    }
  }
  return function () {
    setAutoKws()
  }
})()
