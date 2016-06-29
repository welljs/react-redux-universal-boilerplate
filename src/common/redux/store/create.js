import { createStore as reduxCreateStore, applyMiddleware, compose } from 'redux';
import { default as requestMiddleware } from './../middleware/request';
import {syncHistory} from 'react-router-redux';
import {combineReducers} from './reducers';
import * as commonReducers from '../applyList';
const appReducers = require(`../../../apps/${__APPNAME__}/redux/applyList`);


const reducers = combineReducers({...appReducers, ...commonReducers});

export default function createStore({history, data, requestHelper}) {
  const reduxRouterMiddleware = syncHistory(history);
  let finalCreateStore = applyMiddleware(...[requestMiddleware(requestHelper), reduxRouterMiddleware])(reduxCreateStore);
  const store = finalCreateStore(reducers, data);
  reduxRouterMiddleware.listenForReplays(store);
  return store;
}
