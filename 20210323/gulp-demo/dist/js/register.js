"use strict";window.addEventListener("load",function(){var e=document.querySelector("#tel"),n=document.querySelector("#qq"),t=document.querySelector("#uname"),i=(document.querySelector("#yzm"),document.querySelector(".yzm")),l=document.querySelector("#pwd"),s=document.querySelector("#pwd2");function r(e,n){e.addEventListener("blur",function(){n.test(this.value)?(this.nextElementSibling.className="success",this.nextElementSibling.innerHTML="输入正确~"):(this.nextElementSibling.className="wrong",this.nextElementSibling.innerHTML="输入错误~")})}r(e,/^1[3|4|5|7|8]\d{9}$/),r(n,/^[1-9]\d{4,}$/),r(t,/^[\u4e00-\u9fa5]{2,8}$/),r(l,/^[a-zA-Z0-9_-]{6,16}$/),i.addEventListener("click",function(){var e=60,n=this;this.disabled=!0;var t=setInterval(function(){e--,n.innerHTML=e+"s后可重新发送",0==e&&(clearInterval(t),n.disabled=!1,n.innerHTML="发送验证码")},1e3)}),s.addEventListener("blur",function(){""!==this.value&&this.value==l.value?(this.nextElementSibling.className="success",this.nextElementSibling.innerHTML="输入正确~"):(this.nextElementSibling.className="wrong",this.nextElementSibling.innerHTML="两次密码输入不一致~")})});