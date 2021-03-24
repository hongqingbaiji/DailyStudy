// 引用gulp模块
const gulp = require('gulp');
// 引用html文件压缩插件
const htmlmin = require('gulp-htmlmin');
// 引用抽取文件插件
const fileinclude = require('gulp-file-include');
// 引用less插件
const less = require('gulp-less');
//使用gulp.task()建立任务
//有两个参数，1、任务名称，2、任务的回调函数
gulp.task('first', (done) => {
    console.log('第一个gulp');
    //使用gulp.src()获取要处理的文件
    gulp.src('./src/css/base.css')
        .pipe(gulp.dest('dist/css'));
    done(); //提示gulp，任务到这就完成了
});

//html任务
//html文件中代码的压缩操作
//抽取html文件中的公共代码
gulp.task('seconds', (done) => {
    gulp.src('./src/*.html')
        // 抽取公共代码
        .pipe(fileinclude())
        // 压缩html文件中的代码
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
    done();
});

// css任务
// 1、less语法转换
// 2、css代码压缩
gulp.task('cssmin', (done) => {
    gulp.src('.src/css/*.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css'));
    done();
});