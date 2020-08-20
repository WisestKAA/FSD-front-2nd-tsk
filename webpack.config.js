const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require ('webpack');
const pagesData = require ('./configs/pages-data')

module.exports = (env, options) => {
  const PATHS = {
    src: path.join(__dirname, './src'),
    dist: path.join(__dirname, './out'),
  };
  const production = options.mode === 'production';
  const publicDir = production ? 'https://wisestkaa.github.io/FSD-front-2nd-tsk/' : '/';
  
  
  return{
    devtool: production ? false : 'eval-sourcemap',
    entry: pagesData.entry,    
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
      new MiniCssExtractPlugin({
        filename: 'styles/[name].css',
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      }),      
    ].concat(pagesData.HTMLPlugins),
  };
}