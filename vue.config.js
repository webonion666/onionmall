// const path = require('path');
// function resolve(dir){
//   return path.join(__dirname, dir);
// }
// module.exports = {
//   lintOnSave: true,
//   chainWebpack:config => {
//     config.resolve.alias
//     .set('@', resolve('src'))
//     .set('assets', resolve('src/assets'))
//   }

// }


module.exports = {//会自动和node_modules合并
  configureWebpack: {
    resolve: {//@表示的是src文件夹
      alias: {//配置别名
        assets: '@/assets',
        common: '@/common',
        components: '@/components',
        network: '@/network',
        views: '@/views',
      }   
    }
  }
}