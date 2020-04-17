const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require ('webpack');
const PATHS = {
    src: path.join(__dirname, './src'),
  };
const PAGES_DIR = `${PATHS.src}/pages/`;

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
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                exclude: [/fonts/,],
                use: {
                    loader: 'file-loader',
                    options: {
                        name: `./img/[name].[ext]`,
                        //publicPath: '../',
                    },
                }
            },
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
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/ui-kit/colors-and-type/colors-and-type.pug`,
            filename: './colors-and-type.html',
        }),
        new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/ui-kit/form-elements/form-elements.pug`,
            filename: './form-elements.html',
        }),
        new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/ui-kit/cards/cards.pug`,
            filename: './cards.html',
        }),
        new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/ui-kit/headers-and-footers/headers-and-footers.pug`,
            filename: './headers-and-footers.html',
        }),
        new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/website-pages/landing/landing.pug`,
            filename: './landing.html',
        }),
        new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/website-pages/landing/landing.pug`,
            filename: './landing.html',
        }),
    ]
};