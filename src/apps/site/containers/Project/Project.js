'use strict';
import React, { Component, PropTypes } from 'react';
import {asyncConnect} from 'redux-async-connect';
import {connect} from 'react-redux';
// import {load as loadProject} from '../../redux/project';
import requestReducers from './requestReducers';


requestReducers();

@asyncConnect([
  {
    // key: 'project', promise: ({params, store: {getState, dispatch}}) => dispatch(loadProject(params.id))
    key: 'project', promise: ({params, store: {getState, dispatch}}) => {
      const state = getState();
      return state.project.load.request(params.id);
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
