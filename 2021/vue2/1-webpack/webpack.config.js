const path = require('path');

const HtmlPlugin = require('html-webpack-plugin'); //1、导入插件，得到这个插件的构造函数

const { cleanWebpackPlugin, CleanWebpackPlugin } = require('clean-webpack-plugin'); //左侧是个解构函数

// 2、new 构造函数，创建插件的实例对象
const htmlPlugin = new HtmlPlugin({
  template: './src/index.html', // 指定要复制哪个页面
  filename: './index.html' // 指定复制出来的页面要存放到哪里
});

// 使用 Node.js 中的导出语法，向外导出一个webpack的配置对象
module.exports = {
  // mode代表webpack运行的模式，可选值用两个 development（开发阶段） 和 production(上线阶段)
  // 开发的时候要用 development，速度快
  // 发布上线后要用 production，体积小
  mode: 'development',
  // mode:'production'

  devtool: 'eval-source-map', // 保证运行时报错的行数和源代码的行数保持一致

  // entry -》指定要打包哪个文件
  entry: path.join(__dirname, './src/main.js'),
  // output-》指定打包后生成的文件要存放到哪里,output 有两个属性path和filename
  output: {
    // 存放到目录
    path: path.join(__dirname, 'dist'),
    // 生成的文件名
    filename: 'js/bundle.js'
  },

  plugins: [htmlPlugin, new CleanWebpackPlugin()], // 3、插件的数组，当webpack运行时会加载并调用这些插件

  module: {
    rules: [{
      test: /\.css$/i,
      use: ["style-loader", "css-loader"]
    }]
  },

  resolve: {
    alias: {
      '@': path.join(__dirname, './src/')
    }
  }
}