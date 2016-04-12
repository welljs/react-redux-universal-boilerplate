'use strict';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Page } from '../../components';
import {routeActions} from 'react-router-redux';
import { asyncConnect } from 'redux-async-connect';
import reducer, {load as loadRefs, isLoaded as isRefsLoaded} from '../../reducers/references';

@asyncConnect([
  { promise: ({params, store:{dispatch, getState}}) => dispatch(loadRefs())}
])
@connect(
  state => ({
    refs: state.references
  }), {pushState: routeActions.push}
)
export default class App extends Component {
  static propTypes = {
    pushState: PropTypes.func.isRequired,
    children: PropTypes.object.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    // console.log(this.props);
    return (
      <div className="app">
        <h3>App container</h3>
        <Page {...this.props}>
          { this.props.children }
        </Page>
      </div>
    );
  }
}
