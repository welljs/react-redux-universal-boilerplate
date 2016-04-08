'use strict';
import React, { Component, PropTypes } from 'react';
import {asyncConnect} from 'redux-async-connect';
import {connect} from 'react-redux';
import {request} from '../../../../common/utils';
import {project, designer} from '../../reducers';

@asyncConnect([
  { key: 'projectData', promise: ({store: {dispatch, getState}}) => {
    debugger;
    return project.load()
  }}
])
@connect(state => ({}))
export default class Designer extends Component {
  static propTypes = {};

  render() {
    return (
      <div>
        this is about page
      </div>
    );
  }
}
