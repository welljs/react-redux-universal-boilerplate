import { createStore as reduxCreateStore, applyMiddleware, compose } from 'redux';
import { requestMiddleware, transitionMiddleware } from './middleware';

const router = __CLIENT__ ? require( 'redux-router' ).reduxReactRouter : require( 'redux-router/server' ).reduxReactRouter;
const createHistory = __CLIENT__ ? require( 'history/lib/createBrowserHistory' ) : require ( 'history/lib/createMemoryHistory' );

export default function createStore (getRoutes, reducers, data) {
  return compose(
    router({getRoutes, createHistory}),
    applyMiddleware(...[requestMiddleware, transitionMiddleware])
  )(reduxCreateStore)(reducers, data);
}