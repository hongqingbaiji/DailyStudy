function animate(obj, target, callback) {
  clearInterval(obj.timer)
  //obj.timer 用对象的属性来命名，能防止定时器重名
  obj.timer = setInterval(function () {
    // 步长值：step =（目标值 - 当前的位置）/10
    var step = (target - obj.offsetLeft) / 10
    step = step > 0 ? Math.ceil(step) : Math.floor(step)
    if (obj.offsetLeft == target) {
      clearInterval(obj.timer)
      if (callback) {
        callback()
      }
    }
    obj.style.left = obj.offsetLeft + step + 'px'
  }, 30)
}
