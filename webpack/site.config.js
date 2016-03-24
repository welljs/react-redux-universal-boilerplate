const Path = require('path');
const webpack = require('webpack');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

const __CLIENT__ = true;
const __SERVER__ = false;
const __DEVELOPMENT__ = process.env.NODE_ENV === 'development';
const protocol = 'http';
const HOST = 'localhost';
const PORT = process.env.PORT;
const APPNAME = process.env.APPNAME;

module.exports = {
  context: Path.join(__dirname, '../'),
  entry: {
    app: `./apps/${APPNAME}/client.js`,
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
    path:  Path.resolve(__dirname, `../statics/${APPNAME}/assets/dist`),
    publicPath: `${protocol}://${HOST}:${PORT}/assets/dist/`,
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
        test: /\.scss$/,
        loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap'
      },
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
    new webpack.DefinePlugin({ __CLIENT__, __SERVER__, __DEVELOPMENT__ }),
    webpackIsomorphicToolsPlugin.development()
  ]
};