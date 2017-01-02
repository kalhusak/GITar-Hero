import React, { Component, PropTypes } from 'react';
import './Check.scss';

export default class Check extends Component {

  static defaultSize = 30;
  static propTypes = {
    checked: PropTypes.bool.isRequired,
    colorActive: PropTypes.string,
    colorInactive: PropTypes.string,
    size: PropTypes.number
  };

  render () {
    const { checked, size } = this.props;
    const pathDef = 'M14 32 L30 54 L52 10 Z';
    const checkStyle = {
      width: `${size || Check.defaultSize}px`,
      height: `${size || Check.defaultSize}px`
    };

    return (
      <svg viewBox='0 0 64 64' style={checkStyle}>
        <path className='check__path check__path--bg'
          d={pathDef} style={{ stroke: this.props.colorInactive }} />
        <path className={'check__path' + ((checked) ? ' check__path--checked' : '')}
          d={pathDef} style={{ stroke: this.props.colorActive }} />
      </svg>
    );
  }
};
