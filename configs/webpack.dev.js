const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');

const config = {
  mode: 'development',
  devtool: 'eval-sourcemap',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1
            }
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'resolve-url-loader' },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../out'),
    inline: true
  }
};

module.exports = async () => {
  return merge(common, config);
};
