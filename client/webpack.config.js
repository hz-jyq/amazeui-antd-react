const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const Clean = require('clean-webpack-plugin');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const packages = require('./package.json');

const TARGET = process.env.npm_lifecycle_event;
const BUILD = process.env.NODE_ENV || (TARGET === 'build' ? 'production' : 'development');
process.env.BABEL_ENV = BUILD;

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

const common = {
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: PATHS.app,
        exclude: /node_modules/
      },
      { test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ['file?name=img/[hash].[ext]', 'img?-minimize']
      },
      { test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=50000&name=[path][name].[ext]'},
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      template: 'app/index.html',
      inject: 'body'
    })
  ]
};

const different = function(build) {
  switch(build) {
    case "development":
      return {
        entry: PATHS.app,
        output: {
          path: PATHS.build,
          filename: 'bundle.js'
        },
        module: {
          loaders: [
            {
              test: /\.scss$/,
              loader: 'style!css!sass?sourceMap'
            },
            {test: /\.css$/, loader: "style!css"},
          ]
        },
        // devtool: 'eval-source-map',
        devServer: {
          historyApiFallback: true,
          hot: true,
          inline: true,
          progress: true,
          stats: 'errors-only',
          host: process.env.HOST,
          port:8000,
          proxy: {
            '/api/*': {
              target: 'http://127.0.0.1:2000/',
              rewrite: function(req) {
                req.url = req.url.replace(/^\/api/, '')
              }
            }
          }
        },
        plugins: [
          new webpack.HotModuleReplacementPlugin()
        ]
      };
    case "production":
      return {
        entry: {
          app: PATHS.app,
          vendor: Object.keys(packages.dependencies)
        },
        output: {
          path: PATHS.build,
          filename: 'js/[name].[chunkhash].js',
          chunkFilename: '[chunkhash].js'
        },
        module: {
          loaders: [
            {
              test: /\.scss$/,
              loader: ExtractTextPlugin.extract('style', ['css', 'sass?indentedSyntax=true']),
              include: PATHS.app
            },
            {test: /\.css$/, loader: "style!css"},
          ]
        },
        plugins: [
          new Clean([PATHS.build]),
          new webpack.DefinePlugin({
            "process.env": {
              NODE_ENV: JSON.stringify("production")
            }
          }),
          new ExtractTextPlugin("styles.[chunkhash].css"),
          new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
          }),
          new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false}
          })
        ]
      };
    default:
      return {};
  }
}(BUILD);

module.exports = merge(common, different);
