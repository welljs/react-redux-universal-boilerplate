const DESIGNER_INFO_WAITING = 'DESIGNER_INFO_WAITING';
const DESIGNER_INFO_SUCCESS = 'DESIGNER_INFO_SUCCESS';
const DESIGNER_INFO_FAIL = 'DESIGNER_INFO_FAIL';

const initialState = {};

export default function reducer ( state = initialState, action = {} ) {
  switch ( action.type ) {
    case DESIGNER_INFO_WAITING:
      return { ...state, waiting: true, error: null, data: null };
    case DESIGNER_INFO_SUCCESS:
      return { ...state, waiting: false, error: null, data: action.result };
    case DESIGNER_INFO_FAIL:
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
    types: [DESIGNER_INFO_WAITING, DESIGNER_INFO_SUCCESS, DESIGNER_INFO_FAIL],
    promise: request => request.get(`/designer/${id}`)
  }
}