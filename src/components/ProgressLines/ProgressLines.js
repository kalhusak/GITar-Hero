import React, { Component, PropTypes } from 'react';
import { easeOut } from '../../utils/EaseUtils';
import './ProgressLines.scss';

export default class ProgressLines extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    transitionTime: PropTypes.number
  };

  static defaults = {
    transitionTime: 1000
  };

  constructor (props) {
    super(props);
    this.state = {
      value: this.props.value,
      from: 0,
      to: 0,
      start: 0
    };
    this.animateCounter = ::this.animateCounter;
  }

  getTransitionTime () {
    return this.props.transitionTime || ProgressLines.defaults.transitionTime;
  }

  animateCounter () {
    const { from, to, start, value } = this.state;
    const elapsedTime = Date.now() - start;
    const elapsedFract = easeOut(Math.min(elapsedTime, this.getTransitionTime()) / this.getTransitionTime());
    const currentValue = from + elapsedFract * (to - from);

    if (currentValue !== value) {
      this.setState({
        value: currentValue
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
        to: Math.min(to, 1),
        start: Date.now()
      });

      requestAnimationFrame(this.animateCounter);
    }
  }

  render () {
    return <svg height='50' width='100%'>
      <defs>
        <clipPath id='line-left-bg'>
          <rect x='0' y='0' width='37.5%' height='100%' />
        </clipPath>
        <clipPath id='line-right-bg'>
          <rect x='62.5%' y='0' width='37.5%' height='100%' />
        </clipPath>
        <clipPath id='line-left-fg'>
          <rect x='0' y='0' width={`${this.state.value * 37.5}%`} height='100%' />
        </clipPath>
        <clipPath id='line-right-fg'>
          <rect x={`${100 - this.state.value * 37.5}%`} y='0' width='37.5%' height='100%' />
        </clipPath>
      </defs>
      <ellipse cx='50%' cy='50' rx='55%' ry='50'
        clipPath='url(#line-left-bg)' className='progress-lines__line-bg' />
      <ellipse cx='50%' cy='50' rx='55%' ry='50'
        clipPath='url(#line-right-bg)' className='progress-lines__line-bg' />
      <ellipse cx='50%' cy='50' rx='55%' ry='50'
        clipPath='url(#line-left-fg)' className='progress-lines__line-fg' />
      <ellipse cx='50%' cy='50' rx='55%' ry='50'
        clipPath='url(#line-right-fg)' className='progress-lines__line-fg' />
    </svg>;
  }
}
