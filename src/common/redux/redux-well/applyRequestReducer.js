import {localCompose} from './localCompose';
import {applyReducer} from './reducers';

function createReducer ({storeKey, reducerName, onSuccess, onError, promise}) {
  const WAITING_STATE = `${storeKey}@${reducerName}.waiting`;
  const SUCCESS_STATE = `${storeKey}@${reducerName}.success`;
  const FAIL_STATE = `${storeKey}@${reducerName}.fail`;
  return function reducer (state = {isFailed: false, isWaiting: false}, action = {}) {
    switch (action.type) {
      case WAITING_STATE:
        return {...state, isWaiting: true, isFailed: false};
      case SUCCESS_STATE: 
        return {...state, isWaiting: false, isFailed: false};
      case FAIL_STATE: 
        return {...state, isWaiting: false, isFailed: true};
    }
  }

  function createRequestAction (promise) {
    return {
      types: [WAITING_STATE, SUCCESS_STATE, FAIL_STATE],
      promise
    }
  }
}


//todo проверить можно ли без замыкания
function createDefaultReducer () {
  return function (state) {
    return state;
  }
}

const defaultOptions = {
  initialState: {},
  onSuccess: createDefaultReducer(),
  onFail: createDefaultReducer(),
  promise: Promise.resolve()
};

/**
 * apply
 * @param {String} storeKey
 * @param {Object} reducers
 * @param {Object} [reducers.initialState] - optional parameter to  set up initial state
 * @param {Function} reducers.promise - a promise that performs a request
 * @param {Function} [reducers.onSuccess] - callback on success fulfilled request. Must return new state
 * @param {Function} [reducers.onError] - callback on request fails. Must return new state
 * @param {Boolean} replace - replace existing reducer in cache
 */
export function applyRequestReducer (storeKey, reducers, replace = false) {
  const finalReducers = Object.entries(reducers).reduce((prevReducer, [reducerName, options], index) => {
    console.log(prevReducer);
    console.log(reducerName);
    console.log(options);
    prevReducer.push(createReducer({storeKey, reducerName, ...defaultOptions, ...options}));
  }, []);
  return applyReducer(storeKey, localCompose(...finalReducers), replace);
}
