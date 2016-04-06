import { combineReducers } from 'redux';
import multiruducer from 'multireducer';
import { routeReducer as routing} from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import {default as pageInfo} from './pageInfo';
import * as clientReducers from './exporter';

export default combineReducers({
  routing,
  reduxAsyncConnect,
  ...clientReducers
});
