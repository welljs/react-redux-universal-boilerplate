'use strict';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Page } from '../../components';
import { default as ErrorPage } from '../ErrorPage/ErrorPage';
import {routeActions} from 'react-router-redux';
import { asyncConnect } from 'redux-async-connect';
import reducer, {load as loadRefs, isLoaded as isRefsLoaded} from '../../redux/references';

@connect(state => ({
    // refs: state.references,
    errors: state.errors
  }), {pushState: routeActions.push})
export default class App extends Component {
  static propTypes = {
    pushState: PropTypes.func.isRequired,
    children: PropTypes.object.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const {errors, children} = this.props;
    return (
      <div className="app">
        <h3>App container</h3>
        <Page {...this.props}>
          { !!errors.reason ? <ErrorPage/> : children }
        </Page>
      </div>
    );
  }
}
