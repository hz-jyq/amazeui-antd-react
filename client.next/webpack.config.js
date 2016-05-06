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
    extensions: ['', '.js', '.jsx']
  },
  entry: {
    app: config.paths.app,
    vendor: Object.keys(require('./package.json').dependencies)
  },
  output: {
    path: config.paths.dist,
    publicPath: '/',
    filename: '[name].js',
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
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: path.join(config.paths.app, 'index.html'),
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

if (config.env === 'development') {
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
}

if (config.env === 'production') {
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        dead_code: true,
        unused: true,
        warnings: false
      }
    })
  )
}

module.exports = webpackConfig
