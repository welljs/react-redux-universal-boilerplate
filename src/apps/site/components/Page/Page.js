'use strict';
import React, { Component, PropTypes } from 'react';
import Header from '../Header/Header';

export default class Page extends Component {
  static propTypes = {};

  render() {
    return (
      <div>
        <Header/>
        { this.props.children }
      </div>
    );
  }
}
