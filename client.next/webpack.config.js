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
    root: config.paths.app,
    extensions: ['', '.js', '.jsx']
  },
  entry: {
    app: config.paths.app
  },
  output: {
    path: config.paths.dist,
    publicPath: '/',
    filename: '[name]-[hash].js',
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)$/,     loader: 'babel', exclude: /node_modules/ },
      { test: /\.css$/,          loader: 'style!css' },
      { test: /\.less$/,         loader: 'style!css!less' },
      { test: /\.woff(\?.*)?$/,  loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
      { test: /\.otf(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
      { test: /\.ttf(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]' },
      { test: /\.svg(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
      { test: /\.(png|jpg)$/,    loader: 'url?limit=8192' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(config.env)
      }
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
    historyApiFallback: true,
    proxy: {
      '/api/*': {
        target: 'http://127.0.0.1:2000/',
        rewrite: function(req) {
          req.url = req.url.replace(/^\/api/, '')
        }
      }
    }
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
