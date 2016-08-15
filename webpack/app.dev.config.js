/*
 * Universal configuration
 * 
 * */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

const protocol = 'http';
const HOST = 'localhost';
const PORT = process.env.PORT;
const APPNAME = process.env.APPNAME;
const __CLIENT__ = true;
const __SERVER__ = false;
const __DEVELOPMENT__ = process.env.NODE_ENV === 'dev';
const __APPNAME__ = JSON.stringify(APPNAME);
const __HMR_ENABLE__ = process.env.HMR_ENABLE === 'true';


const commonVendor = require('./vendor');
const appVendor = require(`./${APPNAME}.vendor`);

const entryApp = [`./src/apps/${APPNAME}/client.js`];
const plugins = [
  new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js'}),
  new webpack.DefinePlugin({ __CLIENT__, __SERVER__, __DEVELOPMENT__, __APPNAME__ }),
  //все стили которые не относятся к компонентам тянутся лоудером main.scss и собираются в old.style
  // после того как все разобьется на компоненты, можно будет переименовать в какой-нибудь common.css
  // new ExtractTextPlugin('common.css'),
  webpackIsomorphicToolsPlugin.development()
];
var devtool = 'inline-source-map';
if ( __HMR_ENABLE__ ) {
  entryApp.push('webpack-hot-middleware/client');
  plugins.push(new webpack.HotModuleReplacementPlugin());
  // devtool = 'cheap-module-eval-#' + devtool;
}

module.exports = {
  watchOptions: {
    aggregateTimeout: 100
  },
  context: path.join(__dirname, '../'),
  devtool: devtool,
  entry: {
    app: entryApp,
    vendor: commonVendor.concat(appVendor)
  },
  output: {
    path:  path.resolve(__dirname, `../statics/${APPNAME}/assets/dist`),
    publicPath: `${protocol}://${HOST}:${PORT}/assets/dist/`,
    filename: 'app.js'
  },
  resolve: {
    root: path.resolve(__dirname),

    extensions: ['', '.js', '.jsx'],
    modulesDirectories: [ 'node_modules', 'out', 'statics']
  },
  module: {
    loaders: [
      //собирает стили из компоннент
      {
        test: /\.scss$/,
        exclude: /main.scss/,
        loader: 'style!css?modules&-url&importLoaders=2&localIdentName=[local]___[hash:base64:5]!sass!autoprefixer?browsers=last 2 version'
      },
      //собирает стили из main.scss который подключен в src/APPNAME/client.js
      {
        test: /main.scss$/,
        loader: 'style!css?-url!sass'
      },
      {
        test: /\.json/,
        loader: 'json-loader',
        // exclude: /(node_modules)/
      },
      {
        test: /\.js/,
        loaders: ['react-hot', 'babel-loader?cacheDirectory'],
        include: [
          path.resolve(__dirname, `../src/apps/${APPNAME}`),
          path.resolve(__dirname, `../src/common`)
        ]
      }
    ]
  },
  plugins: plugins
};