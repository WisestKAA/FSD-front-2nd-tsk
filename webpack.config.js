const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'out')
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                'style-loader',
                'css-loader',
                'sass-loader',
                ],
            },
            {
                test: /\.(ttf|eot|woff|svg|woff2)$/,
                use: {
                  loader: "file-loader",
                  options: {
                    name: `./src/fonts/[name].[ext]`,
                  }
                }
            }
        ]
    },
    devServer: {
        contentBase: './out'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.pug'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ]
};