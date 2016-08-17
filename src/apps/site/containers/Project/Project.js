'use strict';
import React, { Component, PropTypes } from 'react';
import {asyncConnect} from 'redux-async-connect';
import {connect} from 'react-redux';
import applyRequestReducers from './requestReducers';
import {requestReducer} from 'easy-redux';


applyRequestReducers();

@asyncConnect([
  {
    key: 'project', promise: ({params}) => requestReducer('project.load').submit(params.id)
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
