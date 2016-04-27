var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
}

module.exports = {
  entry: {
    app: path.join(PATHS.app, 'index.jsx')
  },
  output: {
    path: PATHS.build,
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: PATHS.app,
      loader: 'babel-loader'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(PATHS.app, 'index.html')
    })
  ]
}
