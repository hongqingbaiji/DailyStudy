window.addEventListener('load', function() {
    var that;
    class Tab {

        //公共方法 获取元素
        constructor(id) {
            that = this;
            this.tab = document.querySelector('#tab');
            //li的父元素
            this.ul = this.tab.querySelector('.firstnav ul:first-child');
            //section的父元素
            this.fsection = this.tab.querySelector('.tabscon');
            this.add = this.tab.querySelector('.tabadd span');
            this.init();
        }

        //初始化  绑定事件
        init() {
            this.updateNode();
            this.add.onclick = this.addTab;
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].index = i;
                this.lis[i].onclick = this.toggleTab;
                this.remove[i].onclick = this.removeTab;
                this.sections[i].ondblclick = this.editTab;
                this.spans[i].ondblclick = this.editTab;
            }
        }

        //部分动态元素 li section 关闭按钮x 修改tab使用的span 需要单独获取元素
        updateNode() {
            this.lis = this.tab.querySelectorAll('li');
            this.sections = this.tab.querySelectorAll('.tabscon section');
            this.remove = this.tab.querySelectorAll('.close');
            this.spans = this.tab.querySelectorAll('.firstnav li span:first-child');
        }

        //切换tab 排他思想
        toggleTab() {
            that.clearClass();
            this.className = 'liactive';
            that.sections[this.index].className = 'conactive';
        }

        //删除li和section 里的类
        clearClass() {
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].className = '';
                that.sections[i].className = '';
            }
        }

        //新增tab
        //1)创建li元素和section元素
        //2）把这两个元素追加到对应的父元素里面
        addTab() {
            that.clearClass();
            //创建li元素和section元素
            var li = '<li class="liactive"><span>new tab</span><span class="close">x</span></li>';
            var section = '<section class="conactive">new content</section>';

            //把这两个元素追加到对应的父元素里面
            that.ul.insertAdjacentHTML('beforeend', li);
            that.fsection.insertAdjacentHTML('beforeend', section);
            that.init();
        }

        //删除tab
        // 核心思路：点击x可以删除当前索引号对应的li和section
        removeTab(e) {
            //阻止事件冒泡
            e.stopPropagation();
            var index = this.parentNode.index;
            that.lis[index].remove();
            that.sections[index].remove();
            that.init();

            if (document.querySelector('.liactive')) {
                return;
            }
            index--;
            that.lis[index] && that.lis[index].click();

        }

        //修改tab
        //核心思路：双击文字的时候，在里面生成一个文本框，当失去焦点或者按下回车然后把文本框输入的值给原先的元素即可
        editTab() {
            //双击禁止选中文字
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            var str = this.innerHTML;
            this.innerHTML = '<textarea></textarea>';
            var text = this.children[0];
            text.value = str;
            text.select();

            text.onblur = function() {
                this.parentNode.innerHTML = this.value;
            }
            text.onkeyup = function(e) {
                if (e.keyCode === 13) {
                    this.blur();
                }
            }
        }
    }
    new Tab('#tab');
});