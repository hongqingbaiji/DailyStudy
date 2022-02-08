// 公共的配置

const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 入口
  entry: './src/main.js',
  // 出口
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      // style-loader负责将样式添加到DOM中
      // css-loader 只负责将css文件进行加载
      // 使用多个loader时，是从右向左的
      { test: /\.css$/i, use: ['vue-style-loader', 'style-loader', 'css-loader'] },
      { test: /\.less$/i, use: ['style-loader', 'css-loader', 'less-loader'] },
      {
        // url-loader 和 file-loader
        test: /\.(png|jpg|gif|jpeg)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            // 当加载的图片小于limit时，会将图片编译成base64字符串形式
            // 当加载的图片大于limit时，就会使用 file-loader模块进行加载
            limit: 8192,
            name: 'img/[name].[hash:8].[ext]'
          }
        }],
      },
      {
        //ES6 转化成 ES5
        test: /\.js$/,
        //exclude:排除
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
      },
      { test: /\.vue$/, use: 'vue-loader' },
    ],
  },
  resolve: {
    //alias:别名
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    //引用文件时省略以下文件的后缀名
    extensions: ['.js', '.css', '.vue']
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.BannerPlugin('最终版权归wenhe所有'),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
  ],
  mode: 'development',
}