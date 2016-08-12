import { createStore as reduxCreateStore, applyMiddleware } from 'redux';
import { default as requestMiddleware } from './../middleware/request';
import {syncHistory} from 'react-router-redux';
import {combine as combineReducers} from '../redux-well/reducers';
import * as commonReducers from '../applyList';

const appReducers = require(`../../../apps/${__APPNAME__}/redux/applyList`);

export default function createStore({history, data, requestHelper}) {
  const reducer = combineReducers({...appReducers, ...commonReducers});
  const reduxRouterMiddleware = syncHistory(history);
  let finalCreateStore = applyMiddleware(...[requestMiddleware(requestHelper), reduxRouterMiddleware])(reduxCreateStore);
  return finalCreateStore(reducer, data);
}
