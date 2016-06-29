import { combineReducers as combine} from 'redux';
export const cache = {};
/**
 * @param {String} key - reducers key
 * @param {Function} fn - reducer
 * @param {Boolean} replace - replace existing reducer in cache
 */
export function applyReducer (key, fn, replace = false) {
  if (!!cache[key] && !replace) {
    return console.error(`Reducer with name ${key} exists`);
  }
  cache[key] = fn;
}


/**
 *
 * @param {Object} reducers - reducers that must be merged with cached
 */
export function combineReducers (reducers = {}) {
  return combine({...reducers, ...cache});
}