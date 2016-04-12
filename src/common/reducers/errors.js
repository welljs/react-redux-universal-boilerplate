export const API_FETCHING_ERROR = 'API_FETCHING_ERROR';

const initialState = {
  error: null,
  type: null
};

export default function reducer ( state = initialState, action = {} ) {
  switch ( action.type ) {
    case API_FETCHING_ERROR:
      return { ...state, error: action.reason, type: API_FETCHING_ERROR };
    default: return state;
  }
}

export function addApiError (reason) {
  return { type: API_FETCHING_ERROR, reason }
}