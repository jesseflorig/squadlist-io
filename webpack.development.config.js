'use strict'

var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var WriteFilePlugin = require('write-file-webpack-plugin')

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    path.join(__dirname, 'src/index.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve('./src'), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        include: [path.resolve(__dirname)],
        exclude: /node_modules/
      },
      {
        test: /\.json?$/,
        loader: 'json-loader'
      },
      {
        test: [/\.css$/],
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=public/fonts/[name].[ext]'
      },
      {
        test: [/\.scss$/],
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]',
            'sass-loader?sourceMap'
          ]
        }),
        exclude: /node_modules/
      }
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new WriteFilePlugin({
      // exclude hot-update files
      test: /^(?!.*(hot)).*/
    }),
    new ExtractTextPlugin({
      filename: 'app.css',
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ]
}
