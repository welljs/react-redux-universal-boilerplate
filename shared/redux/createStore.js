import { createStore as reduxCreateStore, applyMiddleware, compose } from 'redux';
import { requestMiddleware, transitionMiddleware } from './middleware';

const router = __CLIENT__ ? require( 'redux-router' ).reduxReactRouter : require( 'redux-router/server' ).reduxReactRouter;
const createHistory = __CLIENT__ ? require( 'history/lib/createBrowserHistory' ) : require ( 'history/lib/createMemoryHistory' );

export default function createStore (routes, reducers, data) {
  const middleware = [ requestMiddleware, transitionMiddleware ];
  let finalCreateStore = applyMiddleware( ...middleware )( reduxCreateStore );
  finalCreateStore = router({ routes, createHistory })( finalCreateStore );
  return finalCreateStore(reducers, data);
}