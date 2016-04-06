import { createStore as reduxCreateStore, applyMiddleware, compose } from 'redux';
import { requestMiddleware } from './middleware';
import {syncHistory} from 'react-router-redux';

export default function createStore (history, reducer, data) {
  const reduxRouterMiddleware = syncHistory(history);
  let finalCreateStore = applyMiddleware(...[requestMiddleware, reduxRouterMiddleware])(reduxCreateStore);
  const store = finalCreateStore(reducer, data);
  reduxRouterMiddleware.listenForReplays(store);
  return store;
}