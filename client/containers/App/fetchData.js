import { isLoaded as isPageLoaded, load as loadPageInfo } from '../../../shared/reducers/pageInfo';

//todo убрать getState и dispatch куда-нибудь в отдельный модуль
export default function fetchData (getState, dispatch, location, params) {
  let promises = [];
  if (!isPageLoaded(getState())) {
    promises.push(dispatch(loadPageInfo(location.pathname)));
  }
  return Promise.all(promises);
}