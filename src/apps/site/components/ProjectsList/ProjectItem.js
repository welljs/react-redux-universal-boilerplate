'use strict';
import React, {Component, PropTypes} from 'react';

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
        <p><a href={`/projects/${url}/`}>{name}</a></p>
        <p>Author: <a href={`/designers/${author.id}/`}>{author.name}</a></p>
      </li>
    );
  }
}
