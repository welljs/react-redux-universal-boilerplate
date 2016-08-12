'use strict';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import ProjectItem from './ProjectItem';
import {applyReducer} from '../../../../common/redux/redux-well/reducers';
import {default as reducer} from './redux';

//adding combined with localCombine component reducers to reducers cache with key 'projects'
applyReducer('projects', reducer);

@connect(state => ({
  projects: state.projects
}))
export default class ProjectsList extends Component {
  static propTypes = {
    projects: PropTypes.shape({
      data: PropTypes.array.isRequired,
      loadWaiting: PropTypes.bool,
      loadFail: PropTypes.bool
    }).isRequired
  };

  render() {
    const {projects} = this.props;
    return (
      <div>
        <h4>Projects list</h4>
        <ul>
          {projects.data.map((project, index) => <ProjectItem key={index} {...project}/>)}
        </ul>
      </div>
    );
  }
}
