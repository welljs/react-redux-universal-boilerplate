import React from 'react';
import ReactDOM from 'react-dom/server';
import { ReduxRouter } from 'redux-router';
import { Provider } from 'react-redux';
import PrettyError from 'pretty-error';
import { match } from 'redux-router/server';

import { createStore } from '../../redux'
import { Html } from '../misc';
import reducer from '../../reducers/reducer';
import { getRoutesStatus } from '../../router';

const pretty = new PrettyError();

function hydrateOnClient(res) {
  const assets = webpackIsomorphicTools.assets();
  res.send('<!doctype html>\n' +
    ReactDOM.renderToString(<Html assets={ assets } store={store}/>));
}

export default function RenderPage ({ routes }) {
  return function (req, res, next) {
    if (__DEVELOPMENT__) {
      // Do not cache webpack stats: the script file would change since
      // hot module replacement is enabled in the development env
      webpackIsomorphicTools.refresh();
    }

    const assets = webpackIsomorphicTools.assets();
    const store = createStore(routes, reducer);

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
}