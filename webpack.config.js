var webpack = require('webpack'),
    path = require('path');

var currentDir = path.join(__dirname, './');

module.exports = {
    mode: 'development',
    entry: [
        path.join(currentDir, 'src/index.js')
    ],
    output: {
        path: currentDir + '/dist',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    devServer: {
        contentBase: currentDir,
        historyApiFallback: true
    }
};