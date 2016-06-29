'use strict';
import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {request} from '../../../../common/utils';

export default class About extends Component {
  static propTypes = {};
  render() {
    return (
      <div>
        this is about page
      </div>
    );
  }
}
