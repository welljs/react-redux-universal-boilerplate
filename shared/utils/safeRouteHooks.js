import { createRoutes } from 'react-router/lib/RouteUtils';

function makeHooksSafe (routes, store) {

}

export default function ( routes ) {
  return function (store) {
    return makeHooksSafe(createRoutes(routes(store)), store);
  }
}