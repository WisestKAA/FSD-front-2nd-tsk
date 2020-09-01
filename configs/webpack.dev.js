const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const config = {
  mode: 'development',
  devtool: 'eval-sourcemap',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          { loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1
            }
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'resolve-url-loader', },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ]
  },
  devServer: {
    contentBase: './out'
  },
}

module.exports = async () => {
  return merge(common, config);
}
