window.addEventListener('load', function() {
    var that;
    class Tab {
        constructor(id) {
            that = this;
            //获取元素,所有的属性和方法都需要添加this
            this.main = document.querySelector(id);
            this.add = this.main.querySelector('.tabadd');
            // li的父元素
            this.ul = this.main.querySelector('.firstnav ul:first-child');
            // section的父元素
            this.fsection = this.main.querySelector('.tabscon');
            this.init();
        }
        init() {
            this.updateNode();
            //init 初始化操作让相关的元素绑定事件
            this.add.onclick = this.addTab;
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].index = i; //获取每个li的索引号
                this.lis[i].onclick = this.toggleTab;
                this.remove[i].onclick = this.removeTab;
                this.spans[i].ondblclick = this.editTab;
                this.sections[i].ondblclick = this.editTab;
            }
        }

        // 获取所有的小li, section，关闭按钮x，span
        updateNode() {
            this.lis = this.main.querySelectorAll('li');
            this.sections = this.main.querySelectorAll('section');
            this.remove = this.main.querySelectorAll('.close');
            this.spans = this.main.querySelectorAll('.firstnav li span:first-child');
        }

        //1、切换功能
        toggleTab() {
            that.clearClass(); //先清除所有人，在设置自己，清除要放前面
            this.className = 'liactive';
            that.sections[this.index].className = 'conactive';
        }

        //清除li和section的类
        clearClass() {
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].className = '';
                this.sections[i].className = '';
            }
        }

        //2、添加功能
        addTab() {
            that.clearClass();
            //1)创建li元素和section元素
            var li = '<li class="liactive"><span>new tab</span><span class="close">x</span></li>';
            var section = '<section class="conactive">new tab content</section>';
            //2）把这两个元素追加到对应的父元素里面
            that.ul.insertAdjacentHTML('beforeend', li);
            that.fsection.insertAdjacentHTML('beforeend', section);
            that.init();
        }

        //3、删除功能
        // 点击x可以删除当前的 li和section
        // x没有索引号，可以用父亲的索引号
        // 核心思路：点击x可以删除当前索引号对应的li和section
        removeTab(e) {
            // 阻止事件冒泡,防止触发li的点击事件
            e.stopPropagation();
            var index = this.parentNode.index;
            //根据索引号删除对应的li和section，用remove()方法
            that.lis[index].remove();
            that.sections[index].remove();
            that.init();
            //当我们删除了不是选中状态的li时，原来的li保持不变
            if (document.querySelector('.liactive')) {
                return;
            }
            //删除选中状态的li时，让它的前一个li处于选定状态
            index--;
            //手动调用我们的点击事件，不需要鼠标触发
            that.lis[index] && that.lis[index].click();

        }

        //4、修改功能
        //1）双击选项卡li和section里面的文字，可以实现修改功能
        //2）双击事件是：ondblclick
        //3）如果双击文字，会默认选中文字，此时需要禁止双击选中文字功能：
        //window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        //核心思路：双击文字的时候，在里面生成一个文本框，当失去焦点或者按下回车然后把文本框输入的值给原先的元素即可
        editTab() {
            //双击禁止选中文字
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            //双击生成一个文本框
            var str = this.innerHTML;
            this.innerHTML = '<textarea cols="30" rows="10"></textarea>';
            var input = this.children[0];
            input.value = str;
            input.select(); //文本框里面的文字处于选定状态
            //当我们离开文本框就把文本框里面的值给span
            input.onblur = function() {
                this.parentNode.innerHTML = this.value;
            }

            //按下回车也可以把文本框里面的值给span
            input.onkeyup = function(e) {
                if (e.keyCode === 13) {
                    this.blur();
                }
            }
        }
    }

    new Tab('#tab');
})