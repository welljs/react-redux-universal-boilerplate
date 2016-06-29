const STATE_WAITING = 'LOAD_USER@STATE_WAITING';
const STATE_SUCCESS = 'LOAD_USER@STATE_SUCCESS';
const STATE_FAIL = 'LOAD_USER@STATE_FAIL';

const initialState = {
  loadWaiting: false,
  loadFail: false
};

export function loadReducer(state = initialState, action = {}) {
  switch (action.type) {
    case STATE_WAITING:
      return {...state, loadWaiting: true, loadFail: true};
    case STATE_SUCCESS:
      return {...state, loadWaiting: false, loadFail: false};
    case STATE_FAIL:
      return {...state, loadWaiting: false, loadFail: true};
    default: return state;
  }
}

export function load (token) {
  return {
    types: [STATE_WAITING, STATE_SUCCESS, STATE_FAIL],
    promise: request => request('/api/load').get({headers:{'X-Auth-Token': token}})
  };
}