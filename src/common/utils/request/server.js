import createMethods from './createMethods';
export default function request (req) {
  return function (url) {
    return createMethods({url, req});  
  }
}