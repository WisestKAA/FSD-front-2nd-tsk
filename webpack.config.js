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
      'index': [
        `${PATHS.src}/index.js`,
        `${PATHS.src}/style.scss`
      ],
      'cards': [
        `${PATHS.src}/pages/ui-kit/cards/cards.js`,
        `${PATHS.src}/pages/ui-kit/cards/cards.scss`,
      ],   
      'colors-and-type': [
        `${PATHS.src}/pages/ui-kit/colors-and-type/colors-and-type.scss`,
      ],
      'form-elements': [
        `${PATHS.src}/pages/ui-kit/form-elements/form-elements.js`,
        `${PATHS.src}/pages/ui-kit/form-elements/form-elements.scss`,
      ],
      'headers-and-footers': [
        `${PATHS.src}/pages/ui-kit/headers-and-footers/headers-and-footers.js`,
        `${PATHS.src}/pages/ui-kit/headers-and-footers/headers-and-footers.scss`,
      ],
      'landing': [
        `${PATHS.src}/pages/website-pages/landing/landing.js`,
        `${PATHS.src}/pages/website-pages/landing/landing.scss`,
      ],
      'registration': [
        `${PATHS.src}/pages/website-pages/registration/registration.js`,
        `${PATHS.src}/pages/website-pages/registration/registration.scss`,
      ],
      'room-details': [
        `${PATHS.src}/pages/website-pages/room-details/room-details.js`,
        `${PATHS.src}/pages/website-pages/room-details/room-details.scss`,
      ],
      'search-room': [
        `${PATHS.src}/pages/website-pages/search-room/search-room.js`,
        `${PATHS.src}/pages/website-pages/search-room/search-room.scss`,
      ],
      'sign-in': [
        `${PATHS.src}/pages/website-pages/sign-in/sign-in.js`,
        `${PATHS.src}/pages/website-pages/sign-in/sign-in.scss`,
      ],
    },
    output: {
      filename: 'scripts/[name].js',
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
                  publicPath: './out',
              }
            },
            { loader: 'css-loader', options: 
              { 
                sourceMap: !production,
                import: true,
                importLoaders: 1          
              } 
            },
            { loader: 'postcss-loader', options: { sourceMap: !production } },
            { loader: 'resolve-url-loader', },
            { loader: 'sass-loader', options: { sourceMap: !production } },
          ],            
        },
        {
          test: /\.(ttf|eot|woff|svg|woff2)$/,
          exclude: [/favicons/,],
          use: {
            loader: "file-loader",
            options: {
              name: `fonts/[name].[ext]`,
              publicPath: '../',
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
            },
          }
        },
        {
          test: /\.(svg|png|ico|xml|json|webmanifest)$/,
          exclude: [/common.blocks/, /img/, /node_modules/, /pages/, /fonts/],
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
        filename: './index.html',
        inject: true,
        chunks: ['index'],
      }),
      new MiniCssExtractPlugin({
        filename: 'styles/[name].css',
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      }),
      new HtmlWebpackPlugin({
        template: `${PAGES_DIR}/ui-kit/colors-and-type/colors-and-type.pug`,
        filename: './colors-and-type.html',
        inject: true,
        chunks: ['colors-and-type'],
      }),
      new HtmlWebpackPlugin({
        template: `${PAGES_DIR}/ui-kit/form-elements/form-elements.pug`,
        filename: './form-elements.html',
        inject: true,
        chunks: ['form-elements'],
      }),
      new HtmlWebpackPlugin({
        template: `${PAGES_DIR}/ui-kit/cards/cards.pug`,
        filename: './cards.html',
        inject: true,
        chunks: ['cards'],
      }),
      new HtmlWebpackPlugin({
        template: `${PAGES_DIR}/ui-kit/headers-and-footers/headers-and-footers.pug`,
        filename: './headers-and-footers.html',
        inject: true,
        chunks: ['headers-and-footers'],
      }),
      new HtmlWebpackPlugin({
        template: `${PAGES_DIR}/website-pages/landing/landing.pug`,
        filename: './landing.html',
        inject: true,
        chunks: ['landing'],
      }),
      new HtmlWebpackPlugin({
        template: `${PAGES_DIR}/website-pages/search-room/search-room.pug`,
        filename: './search-room.html',
        inject: true,
        chunks: ['search-room'],
      }),
      new HtmlWebpackPlugin({
        template: `${PAGES_DIR}/website-pages/room-details/room-details.pug`,
        filename: './room-details.html',
        inject: true,
        chunks: ['room-details'],
      }),
      new HtmlWebpackPlugin({
        template: `${PAGES_DIR}/website-pages/registration/registration.pug`,
        filename: './registration.html',
        inject: true,
        chunks: ['registration'],
      }),
      new HtmlWebpackPlugin({
        template: `${PAGES_DIR}/website-pages/sign-in/sign-in.pug`,
        filename: './sign-in.html',
        inject: true,
        chunks: ['sign-in'],
      }),
    ],
  };
}