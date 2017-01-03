import React, { Component, PropTypes } from 'react';
import './File.scss';

export default class File extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    status: PropTypes.string
  };

  render () {
    const classNames = ['file'];

    switch (this.props.status) {
      case 'staged':
        classNames.push('file--green');
        break;
      case 'added':
        classNames.push('file--red');
        break;
    }

    return (
      <div className={classNames.join(' ')}>
        {this.props.name}
      </div>
    );
  }

}
