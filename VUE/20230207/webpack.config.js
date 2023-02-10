const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// Vue 2的写法
// const VueLoaderPlugin = require('vue-loader/lib/plugin')
// Vue 3的写法
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  externals: {
    vue: 'Vue'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [{ loader: 'vue-loader' }]
        // loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'public/index.html')
    })
  ]
}
