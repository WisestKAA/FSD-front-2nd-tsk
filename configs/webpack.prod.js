const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');

const config = {
  mode: 'production',
  devtool: false,
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: '../',
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              importLoaders: 1
            }
          },
          { loader: 'postcss-loader', options: { sourceMap: false } },
          { loader: 'resolve-url-loader', },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ]
  },
  devServer: {
    contentBase: './out'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].min.css',
    }),
  ],
}

module.exports = async () => {
  config.plugins.concat(common.plugins);
  return merge(common, config);
}
