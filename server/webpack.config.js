const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
    entry: './server.js',
    output: {
        filename: 'server.bundle.ja',
        path: path.resolve('./dist')
    },
    target: 'node',
    externals: [nodeExternals()],
    module: {
        rules: [
            {test: /^.js$/, use: ['babel-loader'], exclude: /node_modules/}
        ]
    }
}