var Path = require('path');
var webpack = require('webpack');

const __CLIENT__ = true;
const __SERVER__ = false;
const __DEVELOPMENT__ = process.env.NODE_ENV === 'development';

module.exports = {
  caseSensitive: false,
  context: Path.join(__dirname, '../'),
  entry: {
    app: './admin/app.js',
    vendors: [
      'react',
      'react-dom',
      'react-router',
      'redux',
      'react-redux',
      'redux-router',
      'history',
      'superagent',
      'multireducer'
    ]
  },
  output: {
    path:  Path.join(__dirname, '../static/assets/js'),
    filename: 'app.js'
  },
  devtool: 'source-map',
  resolve: {
    root: Path.resolve(__dirname),
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: [
      'node_modules'
    ]
  },
  module: {
    loaders: [
      {
        test: /\.json/,
        loader: 'json-loader',
        exclude: /(node_modules)/
      },
      {
        test: /\.js/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
          cacheDirectory: true
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new webpack.DefinePlugin({ __CLIENT__, __SERVER__, __DEVELOPMENT__ })
  ]
};