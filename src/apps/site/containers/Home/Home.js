'use strict';
import React, { Component, PropTypes } from 'react';
import {asyncConnect} from 'redux-async-connect';
import {ProjectsList, loadProjects} from '../../components/ProjectsList';

//page styles
import styles from './styles.scss';

//loading projects before page loaded 
@asyncConnect([
  {
    key: 'projects', 
    promise: ({params, store: {dispatch}}) => dispatch(loadProjects({limit: params.limit || 10}))
  }
])
export default class Home extends Component {
  static propTypes = {};

  render() {
    return (
      <div className={`${styles.mainContainer} some-other-class`}>
        <h3>Home page</h3>
          <ProjectsList/>
      </div>
    );
  }
}
