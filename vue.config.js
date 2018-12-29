const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',//要访问的后端接口
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
      .set('_api', resolve('src/api'))
    config.resolve.extensions
      .add('.vue')
      .add('.js')
      .add('.json')
      .add('.scss')
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
            @import "@/assets/scss/func.scss";
          `
      }
    }
  }
}