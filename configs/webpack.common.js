const pagesData = require('./pages-data');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: pagesData.entry,
  output: {
    filename: 'scripts/[name].js',
    path: path.join(__dirname, '../out'),
    publicPath: './'
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
            presets: ['@babel/preset-env'],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }]
            ]
          }
        }
      },
      {
        test: /\.(ttf|eot|woff|svg|woff2)$/,
        exclude: [/favicons/],
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
            publicPath: '../'
          }
        }
      },
      {
        test: /\.(png|jpg|gif|svg|)$/,
        exclude: [/scss/],
        use: {
          loader: 'file-loader',
          options: {
            name: './img/[name].[ext]'
          }
        }
      },
      {
        test: /\.(svg|png|ico|xml|json|webmanifest)$/,
        exclude: [/blocks/, /img/, /node_modules/, /pages/, /fonts/, /index-data.json/],
        use: [{
          loader: 'file-loader',
          options: {
            name: './favicons/[name].[ext]',
            publicPath: '../'
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ].concat(pagesData.HTMLPlugins),
  resolve: {
    alias: {
      '@pages': path.join(__dirname, '../src/pages'),
      '@src': path.join(__dirname, '../src')
    }
  }
};
