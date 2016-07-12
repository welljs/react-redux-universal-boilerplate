import React from 'react';
import { IndexRoute, Route } from 'react-router';
import * as Pages  from './containers';
import {load as loadUser, isLoaded as isUserLoaded} from '../../common/redux/user/load';

function fetchUserData (getState, dispatch) {
  return function (nextState, replace, next) {
    if (!isUserLoaded(getState())) {
      dispatch(loadUser()).then(() => next()).catch(err => console.debug(err.stack));
    }
    else {
      next();
    }
  }
}

export default ({getState, dispatch}) => {
  return (
    <Route path="/" component={ Pages.App } onEnter={fetchUserData(getState, dispatch)} >
      <IndexRoute component={ Pages.Home }/>
      <Route path="about" component={ Pages.About }/>
      <Route path="designer/:id" component={Pages.Designer} />
      <Route path="/project/:id(/)" component={Pages.Project} />
      <Route path="*" component={ Pages.NotFound } status={ 404 } />
    </Route>
  );
}