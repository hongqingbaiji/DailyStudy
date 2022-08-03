function ajax(options) {
  // 存储的是默认值
  var defaults = {
    type: 'get',
    url: '',
    data: {},
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    success: function () {},
    error: function () {}
  }
  // 使用options对象中的属性覆盖defaults对象中的属性
  Object.assign(defaults, options)

  var xhr = new XMLHttpRequest()
  var params = ''
  // 循环遍历data对象，拼接传递的数据
  for (var attr in defaults.data) {
    params += attr + '=' + defaults.data[attr] + '&'
  }
  // 把最后的&符号截取掉
  params = params.substr(0, params.length - 1)
  // 判断传进来的type是不是get，是的话就把参数拼接到url后面，要记得加个'?'
  if (defaults.type == 'get') {
    defaults.url = defaults.url + '?' + params
  }
  xhr.open(defaults.type, defaults.url)
  // 如果传进来的type是post,要记得设置请求头setRequestHeader()，
  if (defaults.type == 'post') {
    var contentType = defaults.header['Content-Type']
    xhr.setRequestHeader('Content-Type', contentType)
    // 如果'Content-Type'是application/json的话，xhr.send()里传的是json的字符串
    // 所以需要使用JSON.stringify()把json对象转换成json字符串
    // 如果不是json,就把拼接的参数放到send()里面即可
    if (contentType == 'application/json') {
      xhr.send(JSON.stringify(defaults.data))
    } else {
      xhr.send(params)
    }
  } else {
    xhr.send()
  }
  xhr.onload = function () {
    var contentType = xhr.getResponseHeader('Content-Type')
    var responseText = xhr.responseText
    if (contentType.includes('application/json')) {
      responseText = JSON.parse(responseText)
    }
    if (xhr.status == 200) {
      defaults.success(responseText, xhr)
    } else {
      defaults.error(responseText, xhr)
    }
  }
}
