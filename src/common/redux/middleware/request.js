'use strict';
import {addApiError} from '../errors';
import {UPDATE_LOCATION} from 'react-router-redux';

export default function(request){
  return function({dispatch, getState}){
    return next =>{
      let isLocationUpdated;
      return action =>{
        if(action.type == UPDATE_LOCATION && !isLocationUpdated){
          isLocationUpdated = true;
        }

        if(typeof action === 'function'){
          return action(dispatch, getState);
        }

        const {promise, types, ...rest} = action;

        if(!promise){
          return next(action);
        }

        const [ REQUEST, SUCCESS, FAILURE ] = types;
        next({...rest, type: REQUEST});

        const actionPromise = promise(request);

        actionPromise
          .then(
            (result) =>{
              next({...rest, result, type: SUCCESS})
            },
            (error) =>{
              if(__SERVER__ || isLocationUpdated){
                //если без статуса или без кода, значит какая-то непонятная хрень, надо выбросить в браузерн
                if(!error.code || error.code - 0 > 499){
                  dispatch(addApiError(error.code || 500, error));
                }
                isLocationUpdated = false;
              }
              return next({...rest, error, type: FAILURE})
            }
          )
          .catch(err =>{
            console.log('[REQUEST_MIDDLEWARE_ERROR]: ', err);
            next({...rest, err, FAILURE});
          });

        return actionPromise;
      }
    }
  }
}
