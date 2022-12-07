var loginAction = (function (doc) {
  var oModal = doc.getElementsByClassName('J_modal')[0],
    submitURL = doc.getElementById('J_loginForm').action,
    oUsername = doc.getElementById('J_username'),
    oPassword = doc.getElementById('J_password'),
    oErrorTip = doc.getElementsByClassName('J_errorTip')[0],
    oPersistedLogin = doc.getElementById('J_persistedLogin')

  return {
    openLoginBoard: function (show) {
      if (show) {
        oModal.style.display = 'block'
      } else {
        oModal.style.display = 'none'
      }
    },

    login: function (e) {
      var e = e || window.login
      e.preventDefault()

      var username = tools.trimSpace(oUsername.value),
        password = tools.trimSpace(oPassword.value)

      if (username.length < 6 || username.length > 20) {
        oErrorTip.innerText = '用户名长度: 6-20位'
        return
      }
      if (password.length < 6 || password.length > 20) {
        oErrorTip.innerText = '密码长度: 6-20位'
        return
      }

      this.submitForm(username, password, oPersistedLogin.checked)
    },

    submitForm: function (username, password, isPersistedLogin) {
      tools.xhr.ajax({
        url: submitURL,
        type: 'POST',
        dataType: 'JSON',
        data: {
          username: username,
          password: password,
          isPersistedLogin: isPersistedLogin
        },
        success: function (data) {
          var code = data.error_code,
            errorInfo = ''

          switch (code) {
            case '1001':
              errorInfo = '用户名长度不正确'
              break
            case '1002':
              errorInfo = '密码长度不正确'
              break
            case '1003':
              errorInfo = '此用户名不存在'
              break
            case '1004':
              errorInfo = '密码不正确'
              break
            case '1005':
              errorInfo = '登录失败, 请重试'
              break
            case '200':
              location.reload()
              break
            default:
              break
          }
          oErrorTip.innerHTML = errorInfo
        }
      })
    }
  }
})(document)

;(function (doc) {
  var oOpenBtn = doc.getElementsByClassName('J_openBtn')[0],
    oCloseBtn = doc.getElementsByClassName('J_closeBtn')[0],
    oLoginBtn = doc.getElementsByClassName('J_loginBtn')[0]

  var init = function () {
    bindEvent()
  }

  function bindEvent() {
    oOpenBtn.addEventListener('click', loginAction.openLoginBoard.bind(null, true), false)
    oCloseBtn.addEventListener('click', loginAction.openLoginBoard.bind(null, false), false)
    oLoginBtn.addEventListener('click', loginAction.login.bind(loginAction), false)
  }

  init()
})(document)
