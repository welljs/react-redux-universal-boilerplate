import React from 'react';
import ReactDOM from 'react-dom/server';
import { ReduxRouter } from 'redux-router';
import { Provider } from 'react-redux';
import queryString from 'query-string';
import Path from 'path';
import PrettyError from 'pretty-error';
import { match } from 'redux-router/server';

import { createStore } from '../../shared/redux'
import { Html, assets } from '../helpers';
import reducer from '../../shared/reducers/reducer';
import { routes, getRoutesStatus } from '../../shared/router';

const pretty = new PrettyError();

export default function renderPage (req, res, next) {
  const store = createStore(routes, reducer);

  function hydrateOnClient() {
    res.send('<!doctype html>\n' +
      ReactDOM.renderToString(<Html assets={ assets } store={store}/>));
  }

  store.dispatch(match(req.originalUrl, (error, redirectLocation, routerState) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error));
      res.status(500);
      hydrateOnClient();
    } else if (!routerState) {
      res.status(500);
      hydrateOnClient();
    } else {
      // Workaround redux-router query string issue:
      // https://github.com/rackt/redux-router/issues/106
      if (routerState.location.search && !routerState.location.query) {
        routerState.location.query = qs.parse(routerState.location.search);
      }

      store.getState().router.then(() => {
        const component = (
          <Provider store={store} key="provider">
            <ReduxRouter/>
          </Provider>
        );

        const status = getRoutesStatus(routerState.routes);
        if (status) {
          res.status(status);
        }
        res.send('<!doctype html>\n' +
          ReactDOM.renderToString(<Html assets={ assets } component={component} store={store}/>));
      }).catch((err) => {
        console.error('DATA FETCHING ERROR:', pretty.render(err.toString()));
        res.status(500);
        hydrateOnClient();
      });
    }
  }));
}