'use strict';
import React, { Component, PropTypes } from 'react';
import {asyncConnect} from 'redux-async-connect';
import {connect} from 'react-redux';

import {default as applyRequestReducers} from './requestReducers';

applyRequestReducers();

@asyncConnect([
  {
    key: 'project', promise: ({params, store: {getState}}) => {
    console.log('async jopa', getState().project.load);
      return getState().project.load.request(params.id);
    }
  }
])
@connect(state => ({
  project: state.project
}))
export default class Project extends Component {
  static propTypes = {
    project: PropTypes.object.isRequired
  };

  state = {
    error: null
  };

  componentWillReceiveProps (nextProps) {
    const { project:{nextProject} } = nextProps;
    const { project:{currentProject} } = this.props;
    if (!currentProject.error && nextProject.error)
      console.log(nextProject.error);
  }

  render() {
    const {error} = this.state;
    const {project:{data}} = this.props;
    return (
      <div>
        { error
            ?  `Произошла ошибка: ${error.toString()}`
            : <div>
                <strong>{data.name}</strong>: {data.description}
              </div>
        }
      </div>
    );
  }
}
