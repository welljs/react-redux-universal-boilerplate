import { combineReducers } from 'redux';
import multiruducer from 'multireducer';
import { routerStateReducer as router } from 'redux-router';

import * as clientReducers from './exporter';

export default combineReducers({
  ...clientReducers, router
});
