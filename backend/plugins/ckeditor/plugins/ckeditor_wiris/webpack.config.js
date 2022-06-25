const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        app: './global.js'
    },
    output: {
        path: path.resolve(__dirname, ''),
        filename: './plugin.js'
    },
    // Set watch to true for dev purposes.
    watch: false,
    optimization: {
        minimizer: [
            // Javascript optimizer mainly to minimize js files.
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // Set to true if you want JS source maps.
            }),
        ]
    },
    module: {
        rules: [
            {
                // Rule to translate ES5 javascript files to ES6.
                test: /\.js$/,
                exclude: /node_modules\/(?!(@wiris\/mathtype-html-integration-devkit)\/).*/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192
                    }
                  }
                ]
            },
            {
                // For the modal close, minimize, maximize icons
                test: /\.svg$/,
                use: [ 'raw-loader' ]
            },
        ]
    },
    stats: {
        colors: true
    }
};