'use strict';
import { request } from '../../utils';

export default function requestMiddleware () {
  return ({ dispatch, getState }) => {
    return next => action => {

      if ( typeof action === 'function' )
        return action(dispatch, getState);

      const { promise, types, ...rest } = action;

      if ( !promise )
        return next(action);

      const [ REQUEST, SUCCESS, FAILURE ] = types;
      next({...rest, type: REQUEST});
      return promise( request )
        .then(
          (result) => next({...rest, result, type: SUCCESS}),
          (error) => next({...rest, error, type: FAILURE})
        )
        .catch(err => {
          console.log('[REQUEST_MIDDLEWARE_ERROR]: ', err);
          next({...rest, err, FAILURE});
        })
    }
  }
}