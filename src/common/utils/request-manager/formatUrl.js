"use strict";
import {getConfig} from '../../utils/helpers';

const {protocol, host, apiPort: port} = getConfig().default;
export default function formatUrl (path) {
  //in case of full address specified
  if (~path.indexOf('http://') || ~path.indexOf('https://')) {
    return path;
  }

  const adjustedPath = path[0] !== '/' ? '/' + path : path;

  if (__SERVER__) {
    return `${protocol}://${host}:${port}/api${adjustedPath}`;
  }
  return `/api${adjustedPath}`;
}