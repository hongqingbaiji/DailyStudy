const path = require('path');
module.exports = {
  // 入口
  entry: './src/main.js',
  // 出口
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      // style-loader负责将样式添加到DOM中
      // css-loader 只负责将css文件进行加载
      // 使用多个loader时，是从右向左的
      { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
      { test: /\.ts$/, use: 'ts-loader' },
    ],
  },
  mode: 'development',
}