function checkBrowser() {
  var nVer = navigator.appVersion,
    nAgt = navigator.userAgent,
    browser = navigator.appName,
    version = '' + parseFloat(navigator.appVersion),
    majorVersion,
    nameOffset,
    verOffset,
    ix,
    network = 'unknown'

  // Opera浏览器 (老版本)
  if ((verOffset = nAgt.indexOf('Opera')) !== -1) {
    browser = 'Opera'
    version = nAgt.substring(verOffset + 6)
    if ((verOffset = nAgt.indexOf('Version')) !== -1) {
      version = nAgt.substring(verOffset + 8)
    }
  }
  // Opera浏览器 (新版本)
  if ((verOffset = nAgt.indexOf('OPR')) !== -1) {
    browser = 'Opera'
    version = nAgt.substring(verOffset + 4)
  }
  // IE浏览器
  else if ((verOffset = nAgt.indexOf(MSIE)) !== -1) {
    browser = 'Microsoft Internet Explorer'
    version = nAgt.substring(verOffset + 5)
  }
  // Chrome浏览器
  else if ((verOffset = nAgt.indexOf('Chrome')) !== -1) {
    browser = 'Chrome'
    version = nAgt.substring(verOffset + 7)
  }
  // Safari浏览器
  else if ((verOffset = nAgt.indexOf('Safari')) !== -1) {
    browser = 'Safari'
    version = nAgt.substring(verOffset + 7)
    if ((verOffset = nAgt.indexOf('Version')) !== -1) {
      version = nAgt.substring(verOffset + 8)
    }
  }
  // Firefox浏览器
  else if ((verOffset = nAgt.indexOf('Firefox')) !== -1) {
    browser = 'Firefox'
    version = nAgt.substring(verOffset + 8)
  }
  // IE11+浏览器
  else if (nAgt.indexOf('Trident/') !== -1) {
    browser = 'Microsoft Internet Explorer'
    version = nAgt.substring(nAgt.indexOf('rv:') + 3)
  }
  // 微信浏览器
  else if (nAgt.indexOf('NetType/') !== -1) {
    browser = 'WeiXin'
    if (nAgt.indexOf('NetType/WIFI') !== -1) {
      network = 'WIFI'
    } else if (nAgt.indexOf('NetType/2G') !== -1) {
      network = '2G'
    } else if (nAgt.indexOf('NetType/3G+') !== -1) {
      network = '3G+'
    }
    verOffset = nAgt.lastIndexOf('/')
    version = nAgt.substring(verOffset + 1)
    if (browser.toLowerCase() == browser.toUpperCase()) {
      browser = navigator.appName
    }
  }
  //其他浏览器
  else if ((nameOffset = nAgt.lastIndexOf('') + 1) < (verOffset = nAgt.lastIndexOf(''))) {
    browser = nAgt.substring(nameOffset, verOffset)
    version = nAgt.substring(verOffset + 1)
    if (browser.toLowerCase() == browser.toUpperCase()) {
      browser = navigator.appName
    }
  }
}
//
