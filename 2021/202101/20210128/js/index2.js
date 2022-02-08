window.addEventListener('load', function() {
    var focus = document.querySelector('.focus');
    var ul = focus.querySelector('.ul');
    var ol = focus.querySelector('.circle');
    var arrowL = document.querySelector('.arrow-l');
    var arrowR = document.querySelector('.arrow-r');
    var focusWidth = focus.offsetWidth;

    // 1、鼠标经过或离开，控制左右按钮的显示或隐藏
    focus.addEventListener('mouseenter', function() {
        arrowL.style.display = 'block';
        arrowR.style.display = 'block';
    })
    focus.addEventListener('mouseleave', function() {
        arrowL.style.display = 'none';
        arrowR.style.display = 'none';
    })

    //2、动态生成小圆圈
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        ol.appendChild(li);
        li.setAttribute('index', i);

    }
})