import React from 'react';
import ReactDOM from 'react-dom';
import { ReduxRouter } from 'redux-router';
import { Provider } from 'react-redux';
import { createStore } from '../../common/redux';
import { safeRouteHooks } from '../../common/utils';
import routes from './routes';
import reducer from '../../common/reducers/reducer';

const store = createStore( safeRouteHooks(routes), reducer, window.__initialData.store );

ReactDOM.render(
  <Provider store={ store } key="provider">
    <ReduxRouter routes={ routes(store) } />
  </Provider>,
  document.getElementById('content')
);