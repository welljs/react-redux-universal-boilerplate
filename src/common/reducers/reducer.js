import { combineReducers } from 'redux';
import multiruducer from 'multireducer';
import { routeReducer as routing} from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import {appName} from '../utils/helpers';

const customReducers = require(`../../../src/apps/${appName()}/reducers/index`);

export default combineReducers({
  routing,
  reduxAsyncConnect,
  ...customReducers
});
