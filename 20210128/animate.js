function animate(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var step = (target - obj.offsetLeft) / 10;
        // 把步长值取整
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            // 在结束定时器的后面判断是否有第三个参数callback
            if (callback) {
                //如果有就调用一下这个函数；
                callback();
            }
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15)
}