#!/usr/bin/env node
global.__SERVER__ = true;
global.__APPNAME__ = process.env.APPNAME;
require('../server.babel');
require(`../src/apps/${process.env.APPNAME}/server/api/app`);
