#!/usr/bin/env node
global.__SERVER__ = true;
require('../server.babel');
require(`../src/apps/${process.env.APPNAME}/server/api/app`);
