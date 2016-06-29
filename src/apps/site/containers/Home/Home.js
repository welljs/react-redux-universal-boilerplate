'use strict';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import styles from './styles.scss';

export default class Home extends Component {
  static propTypes = {};

  componentDidMount () {
    console.log('home mounted', __APPNAME__);
  }

  render() {
    return (
      <div className={`${styles.mainContainer} some-other-class`}>
        <h3>Pages</h3>
        <ul>
          <li>Проект: <Link to="/project/dom_na_hruschiovke">Дом на Хрущевке</Link></li>
          <li>Автор: <Link to="/designer/12">Вася</Link></li>
        </ul>
      </div>
    );
  }
}
