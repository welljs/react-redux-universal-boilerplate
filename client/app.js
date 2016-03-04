import React from 'react';
import ReactDOM from 'react-dom';
import { ReduxRouter } from 'redux-router';
import { Provider } from 'react-redux';
import { createStore } from '../shared/redux';
import { safeRouteHooks } from '../shared/utils';
import { routes } from '../shared/router';
import reducer from '../shared/reducers/reducer';

const store = createStore( safeRouteHooks(routes), reducer, window.__initialData.store );

ReactDOM.render(
  <Provider store={ store } key="provider">
    <ReduxRouter routes={ routes(store) } />
  </Provider>,
  document.getElementById('content')
);