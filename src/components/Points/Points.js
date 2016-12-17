import React, { Component } from 'react';
import './Points.scss';

const transitionTime = 3000;

export default class Points extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: props.value,
      from: 0,
      to: 0,
      start: 0
    };
    this.animateCounter = ::this.animateCounter;
  }

  ease (t) {
    return (--t) * t * t + 1;
  }

  animateCounter () {
    const { from, to, start, value } = this.state;
    const elapsedTime = Date.now() - start;
    const currentValue = from + Math.round(this.ease(elapsedTime / transitionTime) * (to - from));

    if (elapsedTime < transitionTime) {
      requestAnimationFrame(this.animateCounter);
    }

    if (currentValue !== value) {
      this.setState({
        value: currentValue
      });
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
      <div className='points-container__points'>{this.state.value}</div>
    </div>;
  }
}
