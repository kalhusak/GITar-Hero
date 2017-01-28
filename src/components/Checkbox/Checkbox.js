import React, { Component, PropTypes } from 'react';
import './Checkbox.scss';

export default class Checkbox extends Component {

  static propTypes = {
    value: PropTypes.bool,
    active: PropTypes.bool,
    size: PropTypes.number
  };

  static defaultSize = 16;

  render () {
    const size = {
      width: `${this.props.size || Checkbox.defaultSize}px`,
      height: `${this.props.size || Checkbox.defaultSize}px`
    };

    const pathDef = 'M12 41 L22 51 L56 15 Z';

    return (
      <div className={'checkbox' + (this.props.value || this.props.active ? ' checkbox--active' : '')} style={size}>
        <svg viewBox='0 0 64 64' style={size}>
          <path className={'checkbox__path' + (this.props.value ? ' checkbox__path--checked' : '')} d={pathDef} />
        </svg>
      </div>
    );
  }
};
