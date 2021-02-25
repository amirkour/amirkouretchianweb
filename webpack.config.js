const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, './'),
    // entry: './Spa/Sidebar/fooberloober.js',
    entry: './Spa/React/Todos/index.js',
    output:{
        path: path.resolve(__dirname, './wwwroot/js/'),
        filename: 'bundle.js'
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    module: {
        rules: [
            { 
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                // exclude: /(node_modules|bower_components)/,
                use: 'babel-loader'
            }
        ],
    },
    watchOptions:{
        ignored: ['**/node_modules/']
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
};
