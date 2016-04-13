"use strict";
import createMethod from './createMethod';
const methods = ['get', 'post', 'put', 'patch', 'del', 'set'];

export default function createMethods ({url, req}) {
  let api = {};
  methods.forEach((method) => {
    api[method] = createMethod(method, url, req)
  });
  return api;
}