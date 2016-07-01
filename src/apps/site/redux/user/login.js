const STATE_WAITING = 'LOGIN@STATE_WAITING';
const STATE_SUCCESS = 'LOGIN@STATE_SUCCESS';
const STATE_FAIL = 'LOGIN@STATE_FAIL';

const initialState = {
  loginWaiting: false,
  loginFail: false
};

export function loginReducer(state = initialState, action = {}) {
  switch (action.type) {
    case STATE_WAITING:
      return {...state, loginWaiting: true, loginFail: true};
    case STATE_SUCCESS:
      return {...state, loginWaiting: false, loginFail: false};
    case STATE_FAIL:
      return {...state, loginWaiting: false, loginFail: true};
    default: return state;
  }
}

export function login ({email, password}) {
  return {
    types: [STATE_WAITING, STATE_SUCCESS, STATE_FAIL],
    promise: request => request('/user/login').post({ params: {email, password} })
  };
}