'use strict';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Home extends Component {
  static propTypes = {};

  componentDidMount () {
    console.log('home mounted');
  }

  render() {
    return (
      <div>
        <Link to="/about">About</Link>
        this is home page!
      </div>
    );
  }
}
