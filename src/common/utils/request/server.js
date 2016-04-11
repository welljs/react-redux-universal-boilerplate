import createMethods from './createMethods';
export default function request (req) {
  return createMethods({req});
}