const path = require('path');

module.exports = {
  entry: path.join(__dirname, './client/index.js'),
  output: {
    filename: 'main.js',
    path: path.join(__dirname, './dist'),
  },
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
};