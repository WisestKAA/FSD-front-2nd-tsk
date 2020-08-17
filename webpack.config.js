const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require ('webpack');

module.exports = (env, options) => {
  const PATHS = {
    src: path.join(__dirname, './src'),
    dist: path.join(__dirname, './out'),
  };
  const PAGES_DIR = `${PATHS.src}/pages/`;
  const production = options.mode === 'production';
  const publicDir = production ? 'https://wisestkaa.github.io/FSD-front-2nd-tsk/' : '/';
  
  
  return{
    devtool: production ? false : 'eval-sourcemap',
    entry:{
      'main.js': `${PATHS.src}/index.js`,
    },
    output: {
      filename: '[name]',
      path: PATHS.dist,            
      publicPath: publicDir,
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
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader, 
              options: {
                  publicPath: './out/',
              }
            },
            { loader: 'css-loader', options: 
              { 
                sourceMap: !production,
                importLoaders: 1          
              } 
            },
            { loader: 'postcss-loader', options: { sourceMap: !production } },
            { loader: 'sass-loader', options: { sourceMap: !production } },
          ],            
        },
        {
          test: /\.(ttf|eot|woff|svg|woff2)$/,
            use: {
            loader: "file-loader",
            options: {
              name: `fonts/[name].[ext]`,
              publicPath: './',
            }
          }
        },
        {
          test: /\.(png|jpg|gif|svg|)$/,
          exclude: [/fonts/,],
          use: {
            loader: 'file-loader',
            options: {
              name: `./img/[name].[ext]`,
              //publicPath: '../',
            },
          }
        },
        {
          test: /\.(svg|png|ico|xml|json|webmanifest)$/,
          exclude: [/common.blocks/, /img/, /node_modules/, /library.blocks/, /pages/],
          use: [{
            loader: 'file-loader',
            options: {
              name: './favicons/[name].[ext]',
              publicPath: '../',
            },
          }],
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
        template: `${PAGES_DIR}/website-pages/search-room/search-room.pug`,
        filename: './search-room.html',
      }),
      new HtmlWebpackPlugin({
        template: `${PAGES_DIR}/website-pages/room-details/room-details.pug`,
        filename: './room-details.html',
      }),
      new HtmlWebpackPlugin({
        template: `${PAGES_DIR}/website-pages/registration/registration.pug`,
        filename: './registration.html',
      }),
      new HtmlWebpackPlugin({
        template: `${PAGES_DIR}/website-pages/sign-in/sign-in.pug`,
        filename: './sign-in.html',
      }),
    ]
  };
}