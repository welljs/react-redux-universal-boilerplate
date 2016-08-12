import {applyReducer} from './redux-well/reducers';

const API_FETCHING_ERROR = 'API_FETCHING_ERROR';

const initialState = {
  reason: null,
  status: null,
  type: null
};

applyReducer('errors', ( state = initialState, {type, status, reason} = {} ) => {
  switch ( type ) {
    case API_FETCHING_ERROR:
      return { ...state, reason, status, type: API_FETCHING_ERROR };
    default: return state;
  }
});

export function addApiError (status, reason) {
  return { type: API_FETCHING_ERROR, reason, status }
}