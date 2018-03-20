// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../docs/index.html'), // '../dist/index.html'
        assetsRoot: path.resolve(__dirname, '../docs'), // '../dist'
        assetsSubDirectory: 'static',
        assetsPublicPath: '', // '/' 온라인 출판
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        port: 8080,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        // 포트 프록시, API를 크로스 도메인 액세스를 달성하기 위해, 3000 포트, 프런트 엔드 포트 8080에서 서버를 엽니 다
        // 따라서 포트 8080에 액세스하는 리소스는 포트 3000으로 전달됩니다.
        proxyTable: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true
            }
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}