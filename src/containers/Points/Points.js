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
      <div className='points-container__score-label'>score: </div>
      <div className={this.state.animate ? 'points-container__animate-increase' : ''}>
        {this.state.value}
      </div>
    </div>;
  }
};

export default connect(state => ({ value: state.points.value }))(Points);
