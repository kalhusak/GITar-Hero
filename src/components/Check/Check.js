import React, { Component, PropTypes } from 'react';
import './Check.scss';

export default class Check extends Component {

  static propTypes = {
    checked: PropTypes.bool.isRequired
  };

  render () {
    const { checked } = this.props;
    const pathDef = 'M14 32 L30 54 L52 10 Z';

    return (
      <svg className='check' viewBox='0 0 64 64'>
        <path className='check__path check__path--bg' d={pathDef} />
        <path className={'check__path' + ((checked) ? ' check__path--checked' : '')} d={pathDef} />
      </svg>
    );
  }
};
