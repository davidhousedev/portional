const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const host = require('ip').address();
const path = require('path');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    disableHostCheck: true,
    hot: true,
    host,
    headers: { 'Access-Control-Allow-Origin': '*' },
    port: 8080,
    publicPath: `http://${host}:8080/`, // Full host necessary for hot module replacement
  },
  output: {
    path: path.resolve('./dist'),
    publicPath: `http://${host}:8080/`, // Full host necessary for hot module replacement
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
