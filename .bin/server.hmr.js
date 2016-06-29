#!/usr/bin/env node
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__APPNAME__ = process.env.APPNAME;
global.__DEVELOPMENT__ = process.env.NODE_ENV === 'dev';
global.__HMR_ENABLE__ = process.env.HMR_ENABLE == 'true';
global.__APPNAME__ = process.env.APPNAME;
const Path = require('path');
const appPath = `../src/apps/${ process.env.APPNAME }/server/app.hmr`;

require('../server.babel');

var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools'))
  .development(__DEVELOPMENT__)
  .server(Path.resolve(__dirname, '..'), function() {
    require(appPath);
  });
