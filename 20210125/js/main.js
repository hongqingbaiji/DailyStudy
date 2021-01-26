window.addEventListener('load', function() {
    var mainImg = document.querySelector('.mainImg');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    var bigImg = document.querySelector('.bigImg');

    // 鼠标经过盒子把遮罩和大图片显示出来；
    mainImg.addEventListener('mouseover', function() {
            mask.style.display = 'block';
            big.style.display = 'block';
        })
        // 鼠标移出盒子把遮罩和大图片隐藏；
    mainImg.addEventListener('mouseout', function() {
            mask.style.display = 'none';
            big.style.display = 'none';
        })
        // 计算出鼠标在盒子中的位置
    mainImg.addEventListener('mousemove', function(e) {
        var x = e.pageX - mainImg.offsetLeft;
        var y = e.pageY - mainImg.offsetTop;
        // 把鼠标的位置给遮罩层,并让鼠标在遮罩层居中
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;
        // 控制遮罩层的位置，不能出框也叫遮罩层的最大位移
        // 因为是正方形，所以遮罩层的最大位移空间上下左右是一致的
        var maskMax = mainImg.offsetWidth - mask.offsetWidth;
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maskMax) {
            maskX = maskMax;
        }
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maskMax) {
            maskY = maskMax;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';

        // 通过移动遮罩层来控制大图片的移动 按照比例来移动的
        // 有个公式，大图片的移动位置 = 遮罩层的移动位置*大图片的最大移动位置 / 遮罩层的最大移动位置
        //遮罩层的移动位置是maskX 和maskY ；遮罩层的最大移动位置是 maskMax
        var bigMax = bigImg.offsetWidth - big.offsetWidth;
        var bigX = maskX * bigMax / maskMax;
        var bigY = maskY * bigMax / maskMax;
        bigImg.style.left = -bigX + 'px';
        bigImg.style.top = -bigY + 'px';
    })
})