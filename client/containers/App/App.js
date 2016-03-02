'use strict';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { connectData } from '../../../shared/utils';
import fetchData from './fetchData';
import { Page } from '../../components';

@connectData(fetchData)
@connect(state => ({}))
export default class App extends Component {
  static propTypes = {};
  render() {
    return (
      <div className="app">
        <Page {...this.props}>
          { this.props.children }
        </Page>
      </div>
    );
  }
}
