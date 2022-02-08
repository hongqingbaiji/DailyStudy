const path = require('path')

const themePath = path.join(__dirname, './src/theme.less')

module.exports = {
  publicPath: './',
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // // 直接覆盖变量   注：直接覆盖不好，每次修改都要重启服务才能见效
          // 'text-color': '#111',
          // 'border-color': '#eee',

          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          hack: `true; @import "${themePath}";`
        }
      }
    }
  }
}
