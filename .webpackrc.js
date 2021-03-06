export default {
    alias: {
        '@': `${__dirname}/src`,
        '@@': `${__dirname}/src/components`,
    },
    disableCSSModules: true,
    proxy: {
        '/aps': {
            target: 'https://api.baxiaobu.com',
            changeOrigin: true,
            pathRewrite: {
                '^/aps': '',
            }
        },

        '/api': {
            target: 'https://blogs.zdldove.top',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '',
            }
        },
    },
    publicPath: '/',
    extraBabelPlugins: [
        ['import', { 'libraryName': 'antd', 'libraryDirectory': 'es', 'style': 'css' }]
    ],
}
