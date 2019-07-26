const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const webpack = require('webpack');

const port = 8909;

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    disableHostCheck: true,
    hot: true,
    host: '0.0.0.0',
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true,
    port: port,
    publicPath: `http://0.0.0.0:${port}/`, // Full host necessary for hot module replacement
  },
  output: {
    publicPath: `http://localhost:${port}/`, // Full host necessary for hot module replacement
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
