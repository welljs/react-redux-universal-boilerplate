import { combineReducers } from 'redux';
import multiruducer from 'multireducer';
import { routeReducer as routing} from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import {appName} from '../utils/helpers';
import {default as errors} from './errors';

const customReducers = require(`../../../src/apps/${appName()}/reducers/index`);

export default combineReducers({
  routing, errors,
  reduxAsyncConnect,
  ...customReducers
});
