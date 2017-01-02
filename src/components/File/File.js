import React, { Component, PropTypes } from 'react';
import './File.scss';

export default class File extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    status: PropTypes.string
  };

  render () {
    return (
      <div className='file'>{this.props.name}</div>
    );
  }

}
