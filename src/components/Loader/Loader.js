import React, { Component, PropTypes } from 'react';
import { range } from 'lodash';
import './Loader.scss';

export default class Loader extends Component {

  static propTypes = {
    size: PropTypes.number
  };

  static defaultSize = 6;

  renderCircles (size, spacing, jump) {
    return range(0, 3).map(circle => {
      return <circle key={circle} className='loader__circle' cx={(size + spacing) * circle + size / 2}
        cy={jump + size / 2} r={size / 2} style={{ animationDelay: `${circle * 0.1}s` }} />;
    });
  }

  render () {
    const size = this.props.size || Loader.defaultSize;
    const spacing = 0.5 * size;

    const svgStyle = {
      width: `${3 * size + 2 * spacing}px`,
      height: `${size + size}px`
    };

    return (
      <svg style={svgStyle}>
        {this.renderCircles(size, spacing, size)}
      </svg>
    );
  }

}
