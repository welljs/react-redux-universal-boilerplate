'use strict';
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import styles from './ProjectsList.scss';

export default class ProjectItem extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    author: PropTypes.object.isRequired
  };

  render() {
    const {url, author, name} = this.props;
    return (
      <li>
        <p><Link to={`/project/${url}/`}>{name}</Link></p>
        <p>Author: <Link to={`/designers/${author.id}/`}>{author.name}</Link></p>
      </li>
    );
  }
}
