#!/usr/bin/env node
require('../server.babel');
require(`../src/apps/${process.env.APPNAME}/server/api/app`);
