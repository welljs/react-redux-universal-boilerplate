const STATE_WAITING = 'PROJECTS@STATE_WAITING';
const STATE_SUCCESS = 'PROJECTS@STATE_SUCCESS';
const STATE_FAIL = 'PROJECTS@STATE_FAIL';

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

export function load ({limit}) {
  return {
    types: [STATE_WAITING, STATE_SUCCESS, STATE_FAIL],
    promise: request => request('/projects').get({params: {limit}})
  };
}