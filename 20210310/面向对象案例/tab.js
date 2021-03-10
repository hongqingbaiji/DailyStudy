window.addEventListener('load', function() {
    var that;
    class Tab {
        constructor(id) {
            that = this;
            //获取元素
            this.main = document.querySelector(id);
            this.lis = this.main.querySelectorAll('li');
            this.sections = this.main.querySelectorAll('section');
            this.add = this.main.querySelector('.tabadd');
            this.ul = this.main.querySelector('.firstnav ul:first-child');
            this.init();
        }
        init() {
            //init 初始化操作让相关的元素绑定事件
            this.add.onclick = this.addTab;
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].index = i;
                this.lis[i].addEventListener('click', this.toggleTab);

            }
        }

        //1、切换功能
        toggleTab() {
            that.clearClass();
            this.className = 'liactive';
            that.sections[this.index].className = 'conactive';
        }

        //清除类
        clearClass() {
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].className = '';
                this.sections[i].className = '';
            }
        }

        //2、添加功能
        addTab() {
            //1)创建li元素和section元素
            var li = '<li class="liactive"><span>new tab</span><span class="close">x</span></li>';
            //2）把这两个元素追加到对应的父元素里面
            that.ul.insertAdjacentHTML('beforeend', li);

        }

        //3、删除功能
        removeTab() {

        }

        //4、修改功能
        editTab() {

        }
    }

    new Tab('#tab');
})