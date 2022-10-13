domReady(test)

function test() {
  console.log(111)
}
function domReady(fn) {
  if (document.addEventListener) {
    document.addEventListener(
      'DOMContentLoaded',
      function () {
        document.removeEventListener('DOMContentLoaded', arguments.callee, false)
        fn()
      },
      false
    )
  } else if (document.attachEvent) {
    document.attachEvent('onreadystatechange', function () {
      if (this.readyState === 'complete') {
        document.detachEvent('onreadystatechange', arguments.callee)
        fn()
      }
    })
  }

  // 在IE6/7中，doScroll存在并且页面还在加载时，document.documentElement.doScroll会一直报错
  if (document.documentElement.doScroll && typeof window.frameElement === 'undefined') {
    try {
      document.documentElement.doScroll('left')
    } catch (e) {
      return setTimeout(arguments.callee, 20)
    }
    fn()
  }
}
