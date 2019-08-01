const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports ={
    entry: './app/index.js',
    output:{
        path:path.resolve(__dirname, 'dist'),
        filename:'index_bundle.js'
    },
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude:/node_modules/,
                use:'babel-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader'],
            }

        ]
    },
    mode: process.env.NODE_ENV,
    // plugins:[
    //     new HtmlWebpackPlugin({
    //         template: './index.html'
    //     })
    // ],
    devServer:{
        publicPath: '/dist/',
        proxy: {'/api':'http://localhost:3000'},
        filename:'index_bundle.js'
    }

}