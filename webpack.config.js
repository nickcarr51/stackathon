const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: path.join(__dirname, './client/index.js'),
  output: {
    filename: 'main.js',
    path: path.join(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        exclude: /(node_modules)/,
      },
    ],
  },
};