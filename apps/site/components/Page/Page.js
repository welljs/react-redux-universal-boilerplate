'use strict';
import React, { Component, PropTypes } from 'react';

export default class Page extends Component {
  static propTypes = {};

  render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
}