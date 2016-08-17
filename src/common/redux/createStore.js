import { createStore as reduxCreateStore, applyMiddleware } from 'redux';
import {syncHistory} from 'react-router-redux';
import {combine as combineReducers, middleware as requestMiddleware} from 'easy-redux';
import * as commonReducers from './applyList';

const appReducers = require(`../../apps/${__APPNAME__}/redux/applyList`);
import {createRequestReducer} from 'easy-redux';



export default function createStore({history, data, requestHelper}) {
  const reducer = combineReducers({...appReducers, ...commonReducers});
  const reduxRouterMiddleware = syncHistory(history);
  let finalCreateStore = applyMiddleware(...[requestMiddleware(requestHelper), reduxRouterMiddleware])(reduxCreateStore);
  const finalStore = finalCreateStore(reducer, data);
  createRequestReducer(finalStore);
  return finalStore;
}
