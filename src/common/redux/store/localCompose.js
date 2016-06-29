/**
 * combine reducers to pass them to the store under single key
 * @param {Array} reducers
 * @returns {Function}
 */
export function localCompose (...reducers) {
  return function (state, action) {
    return reducers.reduce((prevState, currentReducer) => currentReducer(prevState, action), state);
  }
}