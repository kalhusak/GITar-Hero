import React, { Component, PropTypes } from 'react';
import './File.scss';

export default class File extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    status: PropTypes.string
  };

  render () {
    const classNames = ['file'];

    if (this.props.status === 'modified') {
      classNames.push('file--red');
    } else if (this.props.status === 'staged') {
      classNames.push('file--green');
    }

    return (
      <div className={classNames.join(' ')}>
        {this.props.name}
      </div>
    );
  }

}
