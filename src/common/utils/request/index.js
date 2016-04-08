import createMethods from './createMethods';
export default function request (url) {
  return createMethods({url});
}