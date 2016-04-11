const PROJECT_INFO_WAITING = 'PROJECT_INFO_WAITING';
const PROJECT_INFO_SUCCESS = 'PROJECT_INFO_SUCCESS';
const PROJECT_INFO_FAIL = 'PROJECT_INFO_FAIL';

const initialState = {};

export default function reducer ( state = initialState, action = {} ) {
  switch ( action.type ) {
    case PROJECT_INFO_WAITING:
      console.log('waitin infa');
      return { ...state, waiting: true, error: null, data: null };
    case PROJECT_INFO_SUCCESS:
      console.log('sexes info');
      return { ...state, waiting: false, error: null, data: action.result };
    case PROJECT_INFO_FAIL:
      console.log('fail blya');
      return { ...state, waiting: true, error: action.error, data: null };
    default: return state;
  }
}

//todo сделать globalState доступным через import
export function isLoaded ( globalStat ) {
  return globalStat.pageInfo && !!globalStat.pageInfo.data
}

export function load (id) {
  return {
    types: [PROJECT_INFO_WAITING, PROJECT_INFO_SUCCESS, PROJECT_INFO_FAIL],
    promise: request => request(`/project/${id}`).get({})

  }
}