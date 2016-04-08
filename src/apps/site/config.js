import { default as commonConfig } from '../../common/config';

let resultConfig = {...commonConfig};

if (__SERVER__)
  resultConfig.server = require('./server/config');

export default {...resultConfig, ...{}};