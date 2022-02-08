$(function() {
    // 刷新页面先把数据渲染一下
    load();
    //1、敲下回车键，把内容保存到本地存储中
    $('#title').on('keydown', function(e) {
        if (e.keyCode === 13) {
            // 先做一个为空的处理
            if ($(this).val() == '') {
                alert('请先输入内容！');
            } else {
                // 保存前先进行读取操作，经常用所以封装一个函数
                var local = getDate();
                // 更新数据，并把新数据追加到数组里面
                local.push({ title: $(this).val(), done: false });
                // 保存数据
                saveDate(local);
                // 渲染一下
                load();
                // 渲染完后把input里的内容清空一下
                $(this).val('');
            }
        }
    });
    //2、点击X 删除数据
    $('ol, ul').on('click', 'a', function() {
        //先获取数据
        var data = getDate();
        //在修改数据
        var index = $(this).attr('id'); //返回的是id的属性值
        data.splice(index, 1);
        //保存到本地
        saveDate(data);
        //重新渲染
        load();
    });

    //3、点击复选框，切换正在进行和已经完成
    $('ol, ul').on('click', 'input', function() {
        //先获取数据
        var data = getDate();
        //在修改数据
        var index = $(this).siblings('a').attr('id');
        data[index].done = $(this).prop('checked');
        //保存到本地
        saveDate(data);
        //重新渲染
        load();
    });
    // 读取本地数据的操作
    function getDate() {
        var data = localStorage.getItem('todolist');
        if (data !== null) {
            //本地存储的是字符串格式，需要先转换成对象格式
            return JSON.parse(data);
        } else {
            return [];
        }
    }
    //保存本地数据的操作
    function saveDate(data) {
        localStorage.setItem('todolist', JSON.stringify(data));
    }

    //把数据渲染到页面
    function load() {
        //先读取数据
        var data = getDate();
        //渲染前先把之前的数据清空；
        $('ol, ul').empty();
        // 计算进行中和已经完成的数据数量，先声明一个变量
        var doneCount = 0;
        var todoCount = 0;
        //遍历这个数据
        $.each(data, function(i, n) {
            if (n.done) {
                $('ul').prepend('<li><input type = "checkbox" checked="checked"><p>' + n.title +
                    '</p><a href = "javascript:;" id="' + i + '">x</a></li>');
                doneCount++;
            } else {
                $('ol').prepend('<li><input type = "checkbox"><p>' + n.title +
                    '</p><a href = "javascript:;" id="' + i + '">x</a></li>');
                todoCount++;
            }
        });
        $('#todocount').text(todoCount);
        $('#donecount').text(doneCount);
    }


})