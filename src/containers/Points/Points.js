import React, { Component } from 'react';
import { connect } from 'react-redux';
import { range } from 'lodash';
import Counter from '../../components/Counter';
import './Points.scss';

const INDICATOR_SIZE = 8;
const INDICATOR_BIGGER_EVERY = 9;
const BIGGER_INDICATOR_SIZE = 14;
const NUMBER_OF_INDICATORS = 81;
const SPEEDMETER_RADIUS = 110;

class Points extends Component {
  constructor (props) {
    super(props);
    this.indicatorsCoords = range(0, 2 * Math.PI, 2 * Math.PI / NUMBER_OF_INDICATORS)
      .map((value, index) => {
        const x = -Math.sin(value);
        const y = -Math.cos(value);
        const indicatorSize = index % INDICATOR_BIGGER_EVERY === 0 ? BIGGER_INDICATOR_SIZE : INDICATOR_SIZE;

        return {
          x1: x * SPEEDMETER_RADIUS + SPEEDMETER_RADIUS,
          x2: x * (SPEEDMETER_RADIUS - indicatorSize) + SPEEDMETER_RADIUS,
          y1: y * SPEEDMETER_RADIUS + SPEEDMETER_RADIUS - 70,
          y2: y * (SPEEDMETER_RADIUS - indicatorSize) + SPEEDMETER_RADIUS - 70
        };
      })
      .slice(16, 66);
  }

  renderIndicators (value) {
    const filledNum = this.indicatorsCoords.length * value;
    return this.indicatorsCoords.map((coords, index) => {
      let classNames = 'points-container__speed-meter-indicator';

      if (index < filledNum) {
        classNames += ' points-container__speed-meter-indicator--fill';
      }

      return <line key={index} className={classNames} {...coords} />;
    });
  }

  renderSpeedMeter () {
    return <svg height='155px' width='220px' className='points-container__speed-meter'>
      {this.renderIndicators(0.7)}
    </svg>;
  }

  renderLines () {
    return <svg height='50px' width='100%' className='points-container__lines'>
      <defs>
        <clipPath id='line-left-bg'>
          <rect x='0' y='0' width='37.5%' height='100%' />
        </clipPath>
        <clipPath id='line-right-bg'>
          <rect x='62.5%' y='0' width='37.5%' height='100%' />
        </clipPath>
        <clipPath id='line-left-fg'>
          <rect x='0' y='0' width='18.75%' height='100%' />
        </clipPath>
        <clipPath id='line-right-fg'>
          <rect x='81.25%' y='0' width='18.75%' height='100%' />
        </clipPath>
      </defs>
      <ellipse cx='50%' cy='50px' rx='55%' ry='50px'
        clipPath='url(#line-left-bg)' className='points-container__line-bg' />
      <ellipse cx='50%' cy='50px' rx='55%' ry='50px'
        clipPath='url(#line-right-bg)' className='points-container__line-bg' />
      <ellipse cx='50%' cy='50px' rx='55%' ry='50px'
        clipPath='url(#line-left-fg)' className='points-container__line-fg' />
      <ellipse cx='50%' cy='50px' rx='55%' ry='50px'
        clipPath='url(#line-right-fg)' className='points-container__line-fg' />
    </svg>;
  }

  renderPoints () {
    return <div className='points-container__points'>
      <Counter value={this.props.points} />
      <div className='points-container__points-label'>
        Score
      </div>
    </div>;
  }

  render () {
    return <div className='points-container'>
      {this.renderLines()}
      {this.renderSpeedMeter()}
      {this.renderPoints()}
    </div>;
  }
};

export default connect(({ points, tasks }) => {
  return {
    points: points.value,
    task: tasks.byId[tasks.current]
  };
})(Points);
