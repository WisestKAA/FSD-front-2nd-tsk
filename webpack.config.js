const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require ('webpack');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry:{
        'main.js': './src/index.js',
    },
    output: {
        filename: '[name]',
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
                    {
                        loader: MiniCssExtractPlugin.loader, 
                        options: {
                            publicPath: './out/',
                        }
                    },
                    'css-loader', 
                    'sass-loader'
                ]                
            },
            {
                test: /\.(ttf|eot|woff|svg|woff2)$/,
                use: {
                  loader: "file-loader",
                  options: {
                    name: `../fonts/[name].[ext]`,
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
            template: './src/index.pug',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
          }),
    ]
};