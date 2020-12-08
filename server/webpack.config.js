const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
    entry: './server.js',
    output: {
        filename: 'server.bundle.js',
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