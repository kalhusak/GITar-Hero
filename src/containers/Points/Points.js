import React, { Component } from 'react';
import { connect } from 'react-redux';
import { range } from 'lodash';
import './Points.scss';

const TRANSITION_TIME = 3000;
const INDICATOR_SIZE = 8;
const INDICATOR_BIGGER_EVERY = 9;
const BIGGER_INDICATOR_SIZE = 14;
const NUMBER_OF_INDICATORS = 81;
const SPEEDMETER_RADIUS = 110;

class Points extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: 0,
      from: 0,
      to: 0,
      start: 0,
      animate: false
    };
    this.animateCounter = ::this.animateCounter;
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

  ease (t) {
    return (--t) * t * t + 1;
  }

  animateCounter () {
    const { from, to, start, value } = this.state;
    const elapsedTime = Date.now() - start;
    const elapsedFract = this.ease(Math.min(elapsedTime, TRANSITION_TIME) / TRANSITION_TIME);
    const currentValue = from + Math.round(elapsedFract * (to - from));

    if (currentValue !== value) {
      this.setState({
        value: currentValue,
        animate: currentValue !== to
      });
    }

    if (currentValue !== to) {
      requestAnimationFrame(this.animateCounter);
    }
  }

  componentWillReceiveProps (newProps) {
    const { value: from } = this.state;
    const { value: to } = newProps;

    if (to !== this.props.value) {
      this.setState({
        from,
        to,
        start: Date.now()
      });

      requestAnimationFrame(this.animateCounter);
    }
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
      {this.state.value}
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

export default connect(state => ({ value: state.points.value }))(Points);
