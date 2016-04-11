import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from '../../common/redux';
import {Router, browserHistory} from 'react-router';
import {ReduxAsyncConnect} from 'redux-async-connect';
import useScroll from  'scroll-behavior/lib/useStandardScroll';
import request from '../../common/utils/request';
import routes from './routes';
import reducer from '../../common/reducers/reducer';

const history = useScroll( () => browserHistory)();
const store = createStore({history, reducer, data: window.__initialData.store});

function routerRender (props) {
  return <ReduxAsyncConnect {...props} helpers={{request: request()}} filter={item => !item.deffered}/>
}

ReactDOM.render(
  <Provider store={store} key="provider">
    <Router render={routerRender} history={history}>
      { routes(store) }
    </Router>
  </Provider>,
  document.getElementById('content')
);