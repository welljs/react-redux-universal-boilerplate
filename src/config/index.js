import _ from 'lodash';
const commonConfig = require('./common');
const appConfig = require('./' + __APPNAME__ );
const personalConfig = require('./personal');

const resultConfig = { default: _.merge(commonConfig, appConfig, personalConfig) };

//to avoid getting the server config on the client, modules requiring under condition
if (__SERVER__) {
  resultConfig.server = _.merge(
    require('./common').server,
    require(`./${__APPNAME__}`).server,
    require('./personal').server
  );
}
module.exports = resultConfig;