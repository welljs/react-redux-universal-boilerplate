'use strict';
import React, { Component, PropTypes } from 'react';

export default class ErrorPage extends Component {
  static propTypes = {};

  render() {
    return (
      <div>
        [500] Oops, something break!
      </div>
    );
  }
}
