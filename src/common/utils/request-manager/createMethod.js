import superagent from 'superagent';
import parseError from './errorParser';
import formatUrl from './formatUrl';

export default function createMethod (method, url, req) {
  return function ({params, data, headers} = {}) {
    return new Promise((resolve, reject) => {
      const request = superagent[method](formatUrl(url));
      if (params) {
        request.query(params);
      }
      if (headers) {
        Object.entries(headers).forEach(([key, value])=>{
          if(value != null){
            request.set(key, value);
          }
        });
      }
      if(data) {
        request.send(data);
      }
      request.end((err, {body} = {}) => {
        return err ? reject(parseError(err, body)) : resolve(body)
      });
    });
  }
}