'use strict';
import React, { Component, PropTypes } from 'react';
import {asyncConnect} from 'redux-async-connect';
import {connect} from 'react-redux';
import {request} from '../../../../common/utils';
import reducer, {load as loadProject} from '../../reducers/project';

@asyncConnect([
  { key: 'project', promise: ({params, store:{dispatch}}) => dispatch(loadProject(params.id)) }
])
// @connect(state => ({
  // error: state.project.error,
  // waiting: state.project.waiting,
  // project: state.project.data
// }))
export default class Project extends Component {
  static propTypes = {
    project: PropTypes.object.isRequired
  };

  state = {
    // error: this.props.project.error
  };

  componentWillMount () {
    // console.log(this.props);
  }

  componentWillReceiveProps (nextProps) {
    const { project:{nextProject} } = nextProps;
    const { project:{currentProject} } = this.props;
    if (!currentProject.error && nextProject.error)
      console.log(nextProject.error);
  }

  render() {
    const {error} = this.state;
    // console.log(error.response);
    const {project} = this.props;
    return (
      <div>
        {error ?  `Произошла ошибка: ${error.toString()}` : `Это проект ${project.data.id}`}
      </div>
    );
  }
}
