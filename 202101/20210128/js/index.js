window.addEventListener('load', function() {
    // 1、先获取需要使用的元素
    var focus = document.querySelector('.focus');
    var ul = focus.querySelector('.ul');
    var ol = focus.querySelector('ol');
    var arrowL = document.querySelector('.arrow-l');
    var arrowR = document.querySelector('.arrow-r');

    // 2、实现第1个需求：
    // 鼠标经过轮播图左右按钮显示，鼠标离开左右按钮隐藏
    // 可以使用mouseover+mouseout ，或者mouseenter+mouseleave
    focus.addEventListener('mouseover', function() {
        arrowL.style.display = 'block';
        arrowR.style.display = 'block';
        // 停止自动播放
        clearInterval(timer);
        timer = null;
    })
    focus.addEventListener('mouseout', function() {
        arrowL.style.display = 'none';
        arrowR.style.display = 'none';
        //自动播放
        var timer = setInterval(function() {
            arrowR.click();
        }, 2000)
    })

    // 3、实现第2个需求：动态生成小圆圈，有几张图就生成几个小圆圈；
    for (var i = 0; i < ul.children.length; i++) {
        // 创建元素li，有几张图创建几个li
        var li = document.createElement('li');
        // 把元素里添加到ol中
        ol.appendChild(li);
        // 创建自定义变量 index，并为他动态赋值为 i
        li.setAttribute('index', i);
        ol.children[0].className = 'current';
        li.addEventListener('click', function() {
            //利用排他思想控制点击小圆圈的样式变化
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            //实现第3个需求：点击小圆圈，可以播放相应的图片；
            // 获取自定义变量index
            var index = this.getAttribute('index');
            num = index;
            cired = index;
            // 利用封装好的动画函数animate，实现点击小圆圈移动图片；
            // 因为是向左移动，所以是负值
            animate(ul, -index * focusWidth);
        })
    }
    // 实现第4个需求：
    // 点击右侧按钮一次，图片往左播放一张，以此类推，左侧按钮同理；
    //先克隆第一张图片，放到最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    var num = 0;
    var cired = 0;
    var flag = true;

    arrowL.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ol.children.length;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });

            if (cired == 0) {
                cired = ol.children.length;
            }
            cired--;
            changecircle();
        }

    })
    arrowR.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == ol.children.length) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            cired++;
            if (cired == ol.children.length) {
                cired = 0;
            }
            changecircle();
        }

    })

    function changecircle() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[cired].className = 'current';
    }

    //自动播放
    var timer = setInterval(function() {
        arrowR.click();
    }, 2000)


    // 需要先明白移动原理 播放一张图，其实就是使用动画移动ul，
    // 首先要知道focus的宽度focusWidth，然后要知道轮播图有几张ul.children.length，
    // 然后求出所有轮播图加一起的宽度ul.style.width,一定要记得要加单位px;
    // 这样做的目的是在一行内摆下所有图片；
    var focusWidth = focus.offsetWidth;
    ul.style.width = focusWidth * ul.children.length + 'px';


})