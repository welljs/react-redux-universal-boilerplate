import { PAGE_INFO_WAITING, PAGE_INFO_SUCCESS, PAGE_INFO_FAIL } from '../constants/redux';

const initialState = {};

export default function reducer ( state = initialState, action = {} ) {
  switch ( action.type ) {
    case PAGE_INFO_WAITING:
      return { ...state, waiting: true, error: null, data: null };
    case PAGE_INFO_SUCCESS:
      return { ...state, waiting: false, error: null, data: action.result };
    case PAGE_INFO_FAIL:
      return { ...state, waiting: true, error: action.error, data: null };
    default: return state;
  }
}

//todo сделать globalState доступным через import
export function isLoaded ( globalStat ) {
  return globalStat.pageInfo && !!globalStat.pageInfo.data
}

export function load (route) {
  return {
    types: [PAGE_INFO_WAITING, PAGE_INFO_SUCCESS, PAGE_INFO_FAIL],
    promise: request => request.get(`/page/${route}`)
  }
}