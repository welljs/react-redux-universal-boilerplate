import { createRoutes } from 'react-router/lib/RouteUtils';

function makeHooksSafe (routes, store) {
  if (Array.isArray(routes)) {
    return routes.map((route) => makeHooksSafe(route, store));
  }

  const onEnter = routes.onEnter;

  if (onEnter) {
    routes.onEnter = function safeOnEnter(...args) {
      try {
        store.getState();
      } catch (err) {
        if (onEnter.length === 3) {
          args[2]();
        }

        // There's no store yet so ignore the hook
        return;
      }

      onEnter.apply(null, args);
    };
  }

  if (routes.childRoutes) {
    makeHooksSafe(routes.childRoutes, store);
  }

  if (routes.indexRoute) {
    makeHooksSafe(routes.indexRoute, store);
  }

  return routes;
}

export default function ( routes ) {
  return function (store) {
    return makeHooksSafe(createRoutes(routes(store)), store);
  }
}