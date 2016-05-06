const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')


const config = {
  env: process.env.NODE_ENV || 'development',
  paths: {
    app: path.join(__dirname, 'app'),
    dist: path.join(__dirname, 'dist')
  }
}

const webpackConfig = {
  resolve: {
    root: [config.paths.app],
    extensions: ['', '.js', '.jsx']
  },
  entry: {
    app: config.paths.app
  },
  output: {
    path: config.paths.dist,
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: config.paths.app,
      loader: 'babel-loader'
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(config.env)
      }
    }),
    new HtmlWebpackPlugin({
      template: path.join(config.paths.app, 'index.html'),
      hash: false,
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    })
  ],
  devServer: {
    inline: true,
    historyApiFallback: true
  }
}


module.exports = webpackConfig
