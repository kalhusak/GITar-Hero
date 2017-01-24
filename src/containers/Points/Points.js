import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Points.scss';

const transitionTime = 3000;

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
  }

  ease (t) {
    return (--t) * t * t + 1;
  }

  animateCounter () {
    const { from, to, start, value } = this.state;
    const elapsedTime = Date.now() - start;
    const elapsedFract = this.ease(Math.min(elapsedTime, transitionTime) / transitionTime);
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

  render () {
    return <div className='points-container'>
      <svg xmlns='http://www.w3.org/2000/svg' height='50px' width='100%' className='points-container__lines'>
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
      </svg>
      <div className={this.state.animate ? 'points-container__animate-increase' : ''}>
        {this.state.value}
      </div>
    </div>;
  }
};

export default connect(state => ({ value: state.points.value }))(Points);
