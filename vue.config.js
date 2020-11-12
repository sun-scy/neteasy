//  vue.config.js
const path = require('path')
const resolve = (dir) => path.resolve(__dirname, dir);
//gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin');
//是否为生产环境
const isProd = process.env.NODE_ENV === 'production'
//打包忽略文件
const assetsCDN = {
    externals: {
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        axios: 'axios',
        'better-scroll': 'BScorll'
    },
    css: [],
    js: [
        '//cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
        '//cdn.jsdelivr.net/npm/vue-router@3.3.4/dist/vue-router.min.js',
        '//cdn.jsdelivr.net/npm/vuex@3.4.0/dist/vuex.min.js',
        '//cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js',
        'https://cdn.bootcdn.net/ajax/libs/better-scroll/2.0.5/better-scroll.esm.js'
    ]
}
module.exports = {
    // 选项...
    publicPath: '/', //部署应用包时的基本路径
    outputDir: 'dist', //打包路径
    indexPath: 'index.html',
    lintOnSave: false, //是否启用eslint
    productionSourceMap: false, //不启用source map
    devServer: {
        port: 5000,
        open: true,
        proxy: {
            '/api': {
                target: 'http://localhost:8888',
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
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
        if (isProd) {
            config.plugin('optimize-css')
                .tap(args => {
                    args[0].cssnanoOptions.preset[1].colormin = false
                    return args
                })
            // 生产环境下使用CDN
            config.plugin('html')
                .tap(args => {
                    args[0].cdn = assetsCDN
                    return args
                })
        }


        // 添加别名
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@assets', resolve('src/assets'))
            .set('@components', resolve('src/components'))
            .set('@router', resolve('src/router'))
            .set('@store', resolve('src/store'))
            .set('@pages', resolve('src/pages'));


    },

    configureWebpack: config => {

        if (isProd) {
            config.externals = assetsCDN.externals

        }
        config.optimization = {
            // 分割代码块
            splitChunks: {
                cacheGroups: {
                    // 公用模块抽离
                    common: {
                        chunks: 'initial',
                        minSize: 0, // 大于0个字节
                        minChunks: 2 // 抽离公共代码时，这个代码块最小被引用的次数
                    },
                    // 第三方库抽离
                    vendor: {
                        priority: 1, // 权重
                        test: /node_modules/,
                        chunks: 'initial',
                        minSize: 0, // 大于0个字节
                        minChunks: 2 // 在分割之前，这个代码块最小应该被引用的次数
                    }
                }
            }
        }

    },

}