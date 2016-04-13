'use strict';
import {addApiError} from '../../reducers/errors';
export default function (request) {
  return  function ({ dispatch, getState }) {
    return next => action => {

      if ( typeof action === 'function' )
        return action(dispatch, getState);

      const { promise, types, ...rest } = action;

      if ( !promise )
        return next(action);

      const [ REQUEST, SUCCESS, FAILURE ] = types;
      next({...rest, type: REQUEST});

      const actionPromise = promise(request);

      actionPromise
        .then(
          (result) => next({...rest, result, type: SUCCESS}),
          (error) => {
            dispatch(addApiError(500, error));
            return next({...rest, error, type: FAILURE})
          }
        )
        .catch(err => {
          console.log('[REQUEST_MIDDLEWARE_ERROR]: ', err);
          next({...rest, err, FAILURE});
        });

      return actionPromise;
    }
  }  
}
