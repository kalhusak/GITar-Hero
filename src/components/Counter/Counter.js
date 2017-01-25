import React, { Component, PropTypes } from 'react';
import { easeOut } from '../../utils/EaseUtils';

export default class Counter extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    transitionTime: PropTypes.number
  };

  static defaults = {
    transitionTime: 3000
  };

  constructor (props) {
    super(props);
    this.state = {
      value: 0,
      from: 0,
      to: 0,
      start: 0
    };
    this.animateCounter = ::this.animateCounter;
  }

  getTransitionTime () {
    return this.props.transitionTime || Counter.defaults.transitionTime;
  }

  animateCounter () {
    const { from, to, start, value } = this.state;
    const elapsedTime = Date.now() - start;
    const elapsedFract = easeOut(Math.min(elapsedTime, this.getTransitionTime()) / this.getTransitionTime());
    const currentValue = from + Math.round(elapsedFract * (to - from));

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
        to,
        start: Date.now()
      });

      requestAnimationFrame(this.animateCounter);
    }
  }

  render () {
    return <span>{this.state.value}</span>;
  }
}
