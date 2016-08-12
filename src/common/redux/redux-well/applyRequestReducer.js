import {localCompose} from './localCompose';
import {applyReducer} from './reducers';


const commonInitialState = {
  data: {},
  reducers: []
};

function createReducer ({storeKey, reducerName, promise, initialState = {}}) {
  const WAITING_STATE = `${storeKey}@${reducerName}.waiting`;
  const SUCCESS_STATE = `${storeKey}@${reducerName}.success`;
  const FAIL_STATE = `${storeKey}@${reducerName}.fail`;
  return {
    reducer (state = {...initialState, isFailed: false, isWaiting: false}, action = {}) {
      switch (action.type) {
        case WAITING_STATE:
          return {...state, isWaiting: true, isFailed: false};
        case SUCCESS_STATE:
          return {...state, isWaiting: false, isFailed: false};
        case FAIL_STATE:
          return {...state, isWaiting: false, isFailed: true};
        default: return state;
      }
    },
    request () {
      const args = arguments;
      return {
        types: [ WAITING_STATE, SUCCESS_STATE, FAIL_STATE ],
        promise: request => {
          debugger;
          promise.call(args)
        }
      }
    }
  };
}

//todo проверить можно ли без замыкания
function createDefaultReducer () {
  return function (state) {
    return state;
  }
}

const defaultRequestOptions = {
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
  const finalState = Object.entries(reducers).reduce((prevState, [reducerName, options]) => {
    let {initialState, ...optionsRest} = options;
    initialState = Object.assign(prevState, initialState);
    const {promise, ...summary} = {...defaultRequestOptions, ...optionsRest};
    const reducer = createReducer({storeKey, reducerName, initialState, promise});
    prevState[reducerName] = {...reducer, ...summary};
    prevState.reducers.push(reducer.reducer);
    return prevState;
  }, commonInitialState);
  return applyReducer(storeKey, localCompose(...finalState.reducers), replace);
}
