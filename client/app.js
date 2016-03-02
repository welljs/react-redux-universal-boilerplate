import React from 'react';
import ReactDOM from 'react-dom';
import { ReduxRouter } from 'redux-router';
import { Provider } from 'react-redux';
import { createStore } from '../shared/redux';
import { safeRouteHooks } from '../shared/utils';
import { routes } from '../shared/router';
import reducer from '../shared/reducers/reducer';

const store = createStore( safeRouteHooks(routes), reducer, window.__intialData );

ReactDOM.render(
  <Provider>
    <ReduxRouter store={ store } key="provider"/>
  </Provider>,
  document.getElementById('content')
);