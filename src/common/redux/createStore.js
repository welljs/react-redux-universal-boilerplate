import { createStore as reduxCreateStore, applyMiddleware, compose } from 'redux';
import { requestMiddleware } from './middleware';
import {syncHistory} from 'react-router-redux';
/*
* Creates store on both server or client side 
* @param {object} history - client or server history
* @param
* 
* */
export default function createStore ({history, reducer, data, requestHelper}) {
  const reduxRouterMiddleware = syncHistory(history);
  let finalCreateStore = applyMiddleware(...[requestMiddleware(requestHelper), reduxRouterMiddleware])(reduxCreateStore);
  const store = finalCreateStore(reducer, data);
  reduxRouterMiddleware.listenForReplays(store);
  return store;
}