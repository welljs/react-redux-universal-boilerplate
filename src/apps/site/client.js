import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {Router, browserHistory} from 'react-router';
import {ReduxAsyncConnect} from 'redux-async-connect';
import useScroll from  'scroll-behavior/lib/useStandardScroll';
import {client as requestHelper} from '../../common/utils/request-manager';
import routes from './routes';

//to be sure that all reducers are applied createStore must be imported after import routes
import { default as createStore } from '../../common/redux/store/create';

const history = useScroll( () => browserHistory)();
const appStore = createStore({history, data: window.__initialData.store, requestHelper});

function routerRender (props) {
  return <ReduxAsyncConnect {...props} helpers={{request: requestHelper}} filter={item => !item.deffered}/>
}

ReactDOM.render(
  <Provider store={appStore} key="provider">
    <Router render={routerRender} history={history}>
      { routes(appStore) }
    </Router>
  </Provider>,
  document.getElementById('content')
);
