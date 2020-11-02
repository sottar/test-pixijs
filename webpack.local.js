const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(
  {
    devtool: 'inline-source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {},
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.LoaderOptionsPlugin({
        debug: true,
        minimize: false,
      }),
    ],
    devServer: {
      host: '0.0.0.0',
      hot: true,
      port: 18008,
      inline: true,
      contentBase: path.resolve(__dirname, 'src'),
      historyApiFallback: true,
      // to make dev server http2 compliant
      disableHostCheck: true,
    },
  },
  common,
);
