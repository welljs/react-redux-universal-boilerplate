'use strict';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Page } from '../../components';
import {routeActions} from 'react-router-redux';

@connect(
  state => ({
    pageInfo: state.pageInfo
  }), {pushState: routeActions.push}
)
export default class App extends Component {
  static propTypes = {
    pushState: PropTypes.func.isRequired,
    children: PropTypes.object.isRequired,
    pageInfo: PropTypes.object
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }
  render() {
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
