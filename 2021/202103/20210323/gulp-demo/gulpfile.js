// 引用gulp模块
const gulp = require('gulp');

//使用gulp.task()建立任务
//有两个参数，1、任务名称，2、任务的回调函数
// gulp.task('first', (done) => {
//     console.log('第一个gulp');
//     //使用gulp.src()获取要处理的文件
//     gulp.src('./src/css/base.css')
//         .pipe(gulp.dest('dist/css'));
//     done(); //提示gulp，任务到这就完成了
// });

//html任务
//1、html文件中代码的压缩操作 2、抽取html文件中的公共代码
// 引用html文件压缩插件
const htmlmin = require('gulp-htmlmin');
// 引用抽取文件插件
const fileinclude = require('gulp-file-include');
gulp.task('htmlmin', (done) => {
    gulp.src('./src/*.html')
        // 抽取公共代码
        .pipe(fileinclude())
        // 压缩html文件中的代码
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
    done();
});

// css任务
// 1、less语法转换 2、css代码压缩
// 引用less语法转换插件
const less = require('gulp-less');
// 引用css压缩插件
const cssmin = require('gulp-csso');
gulp.task('cssmin', (done) => {
    gulp.src(['./src/css/*.less', './src/css/*.css'])
        .pipe(less())
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'));
    done();
});

// js任务
//1、js语法转换 2、js压缩混淆
//引用js语法转化插件,可以把es6的代码装换成es5
const babel = require('gulp-babel');
//引用js混淆压缩插件
const uglify = require('gulp-uglify');
gulp.task('jsmin', (done) => {
    gulp.src(['./src/js/base.js', './src/js/*.js'])
        .pipe(babel({
            //它可以判断当前代码的运行环境，
            // 将代码转换为当前运行环境所支持的代码
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
    done();
});

//复制文件夹
gulp.task('copy', (done) => {
    gulp.src('./src/images/*')
        .pipe(gulp.dest('dist/images'));
    gulp.src('./src/upload/*')
        .pipe(gulp.dest('dist/upload'));
    gulp.src('./src/fonts/*')
        .pipe(gulp.dest('dist/fonts'));
    done();
});


// 构建任务
//这样写会报错：Task function must be specified
// gulp.task('default', ['htmlmin', 'cssmin', 'jsmin', 'copy']);
// 问题原因是：gulp 4.0 加入了 gulp.series 和 gulp.parallel 
// 来实现任务的串行化和并行化。
gulp.task('default', gulp.series(['htmlmin', 'cssmin', 'jsmin', 'copy']));