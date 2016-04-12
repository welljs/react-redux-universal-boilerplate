import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import PrettyError from 'pretty-error';

import { match } from 'react-router';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import { createStore } from '../../redux';
import { Html } from '../misc';
import { getRoutesStatus } from '../../router';
import createHistory from 'react-router/lib/createMemoryHistory';
import {server as request} from '../../../common/utils/request';

const pretty = new PrettyError();

function hydrateOnClient(res) {
  const assets = webpackIsomorphicTools.assets();
  res.send('<!doctype html>\n' +
    ReactDOM.renderToString(<Html assets={ assets } store={store}/>));
}

export default function RenderPage ({ routes, reducer }) {
  return function (req, res, next) {
    if (__DEVELOPMENT__) {
      // Do not cache webpack stats: the script file would change since
      // hot module replacement is enabled in the development env
      webpackIsomorphicTools.refresh();
    }

    const {originalUrl: location} = req;
    const assets = webpackIsomorphicTools.assets();
    const history = createHistory(location);
    const requestHelper = request(req);
    const store = createStore({history, reducer, requestHelper});

    const args = {history, routes: routes(store), location};
    match(args, (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        res.redirect(redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        console.error('ROUTER ERROR:', pretty.render(error));
        res.status(500);
        hydrateOnClient();
      } else if (!renderProps) {
        res.status(404);
        hydrateOnClient();
      } else {
        loadOnServer({...renderProps, store, helpers: {request: requestHelper}}).then(() =>{
          const component = (
            <Provider store={store} key="provider">
              <ReduxAsyncConnect {...renderProps}/>
            </Provider>
          );
          const status = getRoutesStatus(renderProps.routes);
          res.status(status || 200);
          global.navigator = {userAgent: req.headers['user-agent']};
          res.send('<!doctype html>\n' +
            ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>));
        });
      }
    });
  }
}