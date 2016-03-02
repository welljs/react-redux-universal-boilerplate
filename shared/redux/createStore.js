import { createStore as reduxCreateStore, applyMiddleware, compose } from 'redux';
import { requestMiddleware, transitionMiddleware } from './middleware';

const router = __CLIENT__ ? require( 'redux-router' ) : require( 'redux-router/server' ).reduxReactRouter;
const createHistory = __CLIENT__ ? require( 'history/lib/createBrowserHistory' ) : require ( 'history/lib/createMemoryHistory' );

export default function createStore (getRoutes, reducers, data) {
  console.log(reducers);
  const middleware = [ requestMiddleware, transitionMiddleware ];
  let finalCreateStore = applyMiddleware( ...middleware )( reduxCreateStore );
  finalCreateStore = router({ getRoutes, createHistory })( finalCreateStore );
  return finalCreateStore(reducers, data);
}