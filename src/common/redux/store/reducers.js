import { combineReducers } from 'redux';
export const cache = {};

/**
 * Add reducer to application reducers cache,  for further combine it with redux final reducers
 * Use this function when you want to combine your components reducers to final reducers
 * @param {String} key - reducers key
 * @param {Function} fn - reducer
 * @param {Boolean} replace - replace existing reducer in cache
 *
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
export function combine (reducers = {}) {
  return combineReducers({...reducers, ...cache});
}