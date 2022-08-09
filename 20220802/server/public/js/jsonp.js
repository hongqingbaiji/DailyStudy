function jsonp(options) {
  var script = document.createElement('script')
  var params = ''
  // 循环对象 拼接要传递的参数
  for (var attr in options.data) {
    params += '&' + attr + '=' + options.data[attr]
  }
  // 创建随机函数名字
  var fnName = 'jsonp' + Math.random().toString().replace('.', '')
  // 把success 变成全局函数
  window[fnName] = options.success
  script.src = options.url + '?callback=' + fnName + params

  document.body.appendChild(script)
  // 加载完成后把script标签删除，防止重复创建
  script.onload = function () {
    document.body.removeChild(script)
  }
}
