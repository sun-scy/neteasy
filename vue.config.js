//  vue.config.js

// const cdn = {
//     externals: {
//         vue: 'Vue',
//         vuex: 'Vuex',
//         'vue-router': 'VueRouter',
//         axios: 'axios'
//     },
//     js: {
//         'https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.common.prod.js',
//         'https://cdn.bootcdn.net/ajax/libs/axios/0.2.1/axios.js'
//     }
// }
module.exports = {
    // 选项...
    publicPath: '/', //部署应用包时的基本路径
    outputDir: 'Dist', //打包路径
    indexPath: 'index.html',
    lintOnSave: false, //是否启用eslint
    productionSourceMap: false, //不启用source map
    configureWebpack:{
        // resolve: {
        //     alias: {
        //         'components': resolve('src/components'),
        //         'pages': resolve('src/pages'),
        //         'http':resolve('src/http'),
        //         'store':resolve('src/store')
        //     }
        // }
    },
    chainWebpack: config => {
        // config.module
        //     .rule('eslint')
        //     .use('eslint-loader')
        //     .loader('eslint-loader')
        //     .tap(options => {
        //         options.fix = true
        //         return options
        //     })


        // set html
        // config.plugin('html').tap(args => {
        //     args[0].title = appConfig.title
        //     args[0].debug = isDebug
        //     // args[0].cdn = cdn
        //     return args
        // }).end()
        // 发行或运行时启用了压缩时会生效
        // config.optimization.minimizer('terser').tap((args) => {
        //     const compress = args[0].terserOptions.compress
        //     // 非 App 平台移除 console 代码(包含所有 console 方法，如 log,debug,info...)
        //     compress.drop_console = true
        //     compress.pure_funcs = [
        //         '__f__' // App 平台 vue 移除日志代码
        //         // 'console.debug' // 可移除指定的 console 方法
        //     ]
        //     return args
        // })
        //忽略打包配置
        // config.externals = cdn.externals
        // config.optimization = {
        //     // 分割代码块
        //     splitChunks: {
        //         cacheGroups: {
        //             // 公用模块抽离
        //             common: {
        //                 chunks: 'initial',
        //                 minSize: 0, // 大于0个字节
        //                 minChunks: 2 // 抽离公共代码时，这个代码块最小被引用的次数
        //             },
        //             // 第三方库抽离
        //             vendor: {
        //                 priority: 1, // 权重
        //                 test: /node_modules/,
        //                 chunks: 'initial',
        //                 minSize: 0, // 大于0个字节
        //                 minChunks: 2 // 在分割之前，这个代码块最小应该被引用的次数
        //             }
        //         }
        //     }
        // }
        
    }
}