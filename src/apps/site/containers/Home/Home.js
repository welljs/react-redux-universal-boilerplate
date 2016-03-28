'use strict';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { appName } from '../../../../common/utils/helpers'

import styles from './styles.scss';

export default class Home extends Component {
  static propTypes = {};

  componentDidMount () {
    console.log('home mounted', appName());
  }

  render() {
    return (
      <div className={`${styles.mainContainer} some-other-class`}>
        <span className="nested">JJ</span>
        <Link to="/about">About</Link>
        this is home page!
      </div>
    );
  }
}
