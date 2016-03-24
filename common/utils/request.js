"use strict";
import superagent from 'superagent';
const methods = ['get', 'post', 'put', 'patch', 'del', 'set'];

function createMethod (method, url) {
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

export default function request(url) {
  let api = {};
  methods.forEach((method) => {
    api[method] = createMethod(method, url)
  });
  return api;
}