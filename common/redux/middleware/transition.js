import { ROUTER_DID_CHANGE } from 'redux-router/lib/constants';

/**
 * 1. Skip holes in route component chain and
 * only consider components that implement
 * fetchData or fetchDataDeferred
 *
 * 2. Pull out fetch data methods
 *
 * 3. Call fetch data methods and gather promises
 *
 * conclusion: походу костыль для роутера
 */

function getDataDependencies (components, getState, dispatch, location, params, deferred) {
  const methodName = deferred ? 'fetchDataDeferred' : 'fetchData';

  return components
    .filter((component) => component && component[methodName]) // 1
    .map((component) => component[methodName]) // 2
    .map(fetchData =>
      fetchData(getState, dispatch, location, params)); // 3
}

function locationsAreEqual( locA, locB) {
  return (locA.pathname === locB.pathname) && (locA.search === locB.search);
}

export default ({getState, dispatch}) => next => action => {
  if (action.type === ROUTER_DID_CHANGE) {
    if (getState().router && locationsAreEqual(action.payload.location, getState().router.location)) {
      return next(action);
    }

    const {components, location, params} = action.payload;
    const promise = new Promise((resolve) => {
      const doTransition = () => {
        next(action);
        Promise.all(getDataDependencies(components, getState, dispatch, location, params, true))
          .then(resolve)
          .catch(error => {
            // TODO: You may want to handle errors for fetchDataDeferred here
            console.warn('Warning: Error in fetchDataDeferred', error);
            return resolve();
          });
      };

      Promise.all(getDataDependencies(components, getState, dispatch, location, params))
        .then(doTransition)
        .catch(error => {
          // TODO: You may want to handle errors for fetchData here
          console.warn('Warning: Error in fetchData', error);
          return doTransition();
        });
    });

    if (__SERVER__) {
      // router state is null until ReduxRouter is created so we can use this to store
      // our promise to let the server know when it can render
      getState().router = promise;
    }

    return promise;
  }
  return next(action);
};
