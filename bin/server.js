#!/usr/bin/env node
global.__CLIENT__ = false;
global.__SERVER__ = true;

require('babel-register');
require('../server/app');