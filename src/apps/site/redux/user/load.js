const STATE_WAITING = 'LOAD_USER@STATE_WAITING';
const STATE_SUCCESS = 'LOAD_USER@STATE_SUCCESS';
const STATE_FAIL = 'LOAD_USER@STATE_FAIL';

const initialState = {
  loadWaiting: false,
  loadFail: false,
  isLoaded: false
};

export function loadReducer(state = initialState, action = {}) {
  switch (action.type) {
    case STATE_WAITING:
      return {...state, loadWaiting: true, loadFail: true, isLoaded: false};
    case STATE_SUCCESS:
      return {...state, loadWaiting: false, loadFail: false, isLoaded: true, data: action.result};
    case STATE_FAIL:
      return {...state, loadWaiting: false, loadFail: true, isLoaded: false};
    default: return state;
  }
}

export function isLoaded (globalState) {
  return globalState.userInfo && globalState.userInfo.isLoaded;
}

export function load (token) {
  return {
    types: [STATE_WAITING, STATE_SUCCESS, STATE_FAIL],
    promise: request => request('/user/load').get({headers:{'X-Auth-Token': token}})
  };
}