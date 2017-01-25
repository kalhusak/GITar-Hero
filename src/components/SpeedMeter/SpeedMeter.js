import React, { Component, PropTypes } from 'react';
import { range } from 'lodash';
import './SpeedMeter.scss';

export default class SpeedMeter extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired
  };

  static defaults = {
    radius: 110,
    indicatorsNum: 81,
    indicatorSize: 8,
    indicatorSizeBigger: 14,
    indicatorBiggerEvery: 9,
    cutIndicators: 16,
    cutHeight: 70
  };

  constructor (props) {
    super(props);
    this.indicatorsCoords = range(0, 2 * Math.PI, 2 * Math.PI / SpeedMeter.defaults.indicatorsNum)
      .map((value, index) => {
        const x = -Math.sin(value);
        const y = -Math.cos(value);
        const indicatorSize = index % SpeedMeter.defaults.indicatorBiggerEvery === 0
          ? SpeedMeter.defaults.indicatorSizeBigger : SpeedMeter.defaults.indicatorSize;

        return {
          x1: x * SpeedMeter.defaults.radius + SpeedMeter.defaults.radius,
          x2: x * (SpeedMeter.defaults.radius - indicatorSize) + SpeedMeter.defaults.radius,
          y1: y * SpeedMeter.defaults.radius + SpeedMeter.defaults.radius - SpeedMeter.defaults.cutHeight,
          y2: y * (SpeedMeter.defaults.radius - indicatorSize) +
            SpeedMeter.defaults.radius - SpeedMeter.defaults.cutHeight
        };
      })
      .slice(SpeedMeter.defaults.cutIndicators,
        SpeedMeter.defaults.indicatorsNum - SpeedMeter.defaults.cutIndicators + 1);
  }

  renderIndicators (value) {
    const filledNum = this.indicatorsCoords.length * value;
    return this.indicatorsCoords.map((coords, index) => {
      let classNames = 'speed-meter__indicator';

      if (index < filledNum) {
        classNames += ' speed-meter__indicator--fill';
      }

      return <line key={index} className={classNames} {...coords} />;
    });
  }

  render () {
    return <svg height={SpeedMeter.defaults.radius * 2 - SpeedMeter.defaults.cutHeight}
      width={SpeedMeter.defaults.radius * 2} className='speed-meter'>
      {this.renderIndicators(this.props.value)}
    </svg>;
  }
}
