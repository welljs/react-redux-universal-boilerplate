const LOAD_REFERENCES_WAITING = 'LOAD_REFERENCES_WAITING';
const LOAD_REFERENCES_SUCCESS = 'LOAD_REFERENCES_SUCCESS';
const LOAD_REFERENCES_FAIL = 'LOAD_REFERENCES_FAIL';

const initialState = {
  waiting: false,
  data: null,
  error: null,
  success: null
};

export default function reducer ( state = initialState, action = {} ) {
  switch ( action.type ) {
    case LOAD_REFERENCES_WAITING:
      return { ...state, waiting: true, success:null, error: null, data: null };
    case LOAD_REFERENCES_SUCCESS:
      return { ...state, waiting: false, error: null, success: true,  data: action.result };
    case LOAD_REFERENCES_FAIL:
      return { ...state, waiting: false, success: false, error: action.error, data: null };
    default: return state;
  }
}

//todo сделать globalState доступным через import
export function isLoaded ( globalStat ) {
  return globalStat.references && !!globalStat.references.data
}

export function load () {
  return {
    types: [LOAD_REFERENCES_WAITING, LOAD_REFERENCES_SUCCESS, LOAD_REFERENCES_FAIL],
    promise: request => {
      return request(`/references`).get({})
    }

  }
}