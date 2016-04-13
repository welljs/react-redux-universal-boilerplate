import React from 'react';
import { IndexRoute, Route } from 'react-router';
import * as Pages  from './containers';

export default ( store ) => {

  return (
    <Route path="/" component={ Pages.App }>
      <IndexRoute component={ Pages.Home }/>
      <Route path="about" component={ Pages.About }/>
      <Route path="designer/:id" component={Pages.Designer} />
      <Route path="/project/:id" component={Pages.Project} />
      <Route path="*" component={ Pages.NotFound } status={ 404 } />
    </Route>
  );
}