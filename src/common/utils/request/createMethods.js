"use strict";
import superagent from 'superagent';
import {appName} from '../../utils/helpers';
const methods = ['get', 'post', 'put', 'patch', 'del', 'set'];
let config;

if (__SERVER__)
  config = require(`../../../apps/${appName()}/server/config`);

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  const {protocol, host, port} = config;
  return __SERVER__ ? `${protocol}://${host}:${port}${adjustedPath}`: adjustedPath;
}

function createMethod (method, url, req) {
  return function ({params, data, headers} = {}) {
    return new Promise((resolve, reject) => {
      const request = superagent[method](url);

      if (params) {
        request.query(params);
      }
      else if (headers) {
        for (let header in headers)
          request.set(header, headers[header]);
      }
      else if (data) {
        request.send(data);
      }

      request.end((err, resp) => err ? reject(err) : resolve(JSON.parse(resp.text || {})));
    });
  }
}

export default function createMethods ({url, req}) {
  let api = {};
  methods.forEach((method) => {
    api[method] = createMethod(method, url, req)
  });
  return api;
}