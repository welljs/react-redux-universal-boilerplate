#!/usr/bin/env node
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVELOPMENT__ = process.env.NODE_ENV === 'dev';
const Path = require('path');
const appPath = `../src/apps/${ process.env.APPNAME }/server/app`;

require('../server.babel');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
 
//нужно для работы с import styles from '*.scss';
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools'))
  .development(__DEVELOPMENT__)
  .server(Path.resolve(__dirname, '..'), function() {
    require(appPath);
  });
