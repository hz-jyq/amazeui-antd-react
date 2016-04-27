var path = require('path')
var webpack = require('webpack')

var PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
}

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  entry: {
    app: PATHS.app
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: PATHS.app,
      loader: 'babel-loader'
    }]
  },
}
