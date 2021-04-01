$(function() {
    // 1.按下回车键 把完整数据存储到本地存储里面
    load();
    $('#title').on('keydown', function(e) {
        if (e.keyCode === 13) {
            if ($(this).val() == '') {
                alert('请输入内容');
            } else {
                // 先读取本地存储原来的数据  封装一个函数
                var local = getDate();
                //把local数组进行更新数据把最新的数据追加给local数组
                local.push({ title: $(this).val(), done: false });
                //把这个数组local 存储到本地存储 也是封装一个函数，并把local传递到函数中
                saveDate(local);
                //2.todolist 本地存储数据渲染加载到页面 也是封装一个函数
                load();
                $(this).val('');
            }
        }
    });
    //3.删除操作
    $('ol, ul').on('click', 'a', function() {
        //先获取本地存储，在修改数据，在保存到本地存储，然后重新渲染
        var data = getDate();
        var index = $(this).attr('id');
        data.splice(index, 1);
        saveDate(data);
        load();
    });
    //4.点击复选框切换正在进行和已完成操作；
    $('ol, ul').on('click', 'input', function() {
        //先获取本地数据，修改数据，保存到本地存储，重新渲染页面
        var data = getDate();
        var index = $(this).siblings('a').attr('id');
        data[index].done = $(this).prop('checked');
        saveDate(data);
        load();
    });

    //读取本地存储的数据
    function getDate() {
        var data = localStorage.getItem('todolist');
        if (data !== null) {
            //本地存储里面的数据是字符串格式的，但是我们需要的是对象格式的；
            return JSON.parse(data);
        } else {
            return [];
        }
    };
    //保存本地存储数据
    function saveDate(data) {
        localStorage.setItem('todolist', JSON.stringify(data));
    };
    //渲染加载页面
    function load() {
        //读取本地数据
        var data = getDate();
        //遍历这个数据
        //遍历数据之前要先把ol里面的数据清空
        $('ol, ul').empty();
        var todoCount = 0;
        var doneCount = 0;
        $.each(data, function(i, n) {
            // $('ol').prepend('<li><input type = "checkbox"><p>' + n.title + '</p><a href = "javascript:;" id="' + i + '">x</a></li>');
            if (n.done) {
                $('ul').prepend('<li><input type = "checkbox" checked="checked"><p>' + n.title + '</p><a href = "javascript:;" id="' + i + '">x</a></li>');
                doneCount++;
            } else {
                $('ol').prepend('<li><input type = "checkbox"><p>' + n.title + '</p><a href = "javascript:;" id="' + i + '">x</a></li>');
                todoCount++;
            }
        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }


})