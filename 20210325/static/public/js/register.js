window.addEventListener('load', function() {
    //表单验证

    //正则表达式
    var regtel = /^1[3|4|5|7|8]\d{9}$/;
    var regqq = /^[1-9]\d{4,}$/; //QQ号从10000开始
    var regname = /^[\u4e00-\u9fa5]{2,8}$/; //昵称
    //var regyzm = /^\d{6}$/; //验证码一般不用正则表达式吧
    var regpwd = /^[a-zA-Z0-9_-]{6,16}$/;

    //获取元素
    var tel = document.querySelector('#tel');
    var qq = document.querySelector('#qq');
    var uname = document.querySelector('#uname');
    var yzminp = document.querySelector('#yzm');
    var yzmbtn = document.querySelector('.yzm');
    var pwd = document.querySelector('#pwd');
    var pwd2 = document.querySelector('#pwd2');

    regexp(tel, regtel); // 手机号码
    regexp(qq, regqq); //QQ号
    regexp(uname, regname); //昵称
    regexp(pwd, regpwd); //密码

    //正则表达式封装成函数
    function regexp(ele, reg) {
        ele.addEventListener('blur', function() {
            if (reg.test(this.value)) {
                this.nextElementSibling.className = 'success';
                this.nextElementSibling.innerHTML = '输入正确~';
            } else {
                this.nextElementSibling.className = 'wrong';
                this.nextElementSibling.innerHTML = '输入错误~';
            }
        });
    }

    // 验证码
    yzmbtn.addEventListener('click', function() {
        var i = 60;
        var that = this;
        this.disabled = true;
        var timer = setInterval(function() {
            i--;
            that.innerHTML = i + 's后可重新发送';
            if (i == 0) {
                clearInterval(timer);
                that.disabled = false;
                that.innerHTML = '发送验证码';
            }
        }, 1000);
    });

    //验证密码是否一致
    pwd2.addEventListener('blur', function() {
        if (this.value !== '' && this.value == pwd.value) {
            this.nextElementSibling.className = 'success';
            this.nextElementSibling.innerHTML = '输入正确~';
        } else {
            this.nextElementSibling.className = 'wrong';
            this.nextElementSibling.innerHTML = '两次密码输入不一致~';
        }
    });

});