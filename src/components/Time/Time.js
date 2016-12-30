import React, { Component, PropTypes } from 'react';
import './Time.scss';

const transitionTime = 3000;

export default class Time extends Component {
  static propTypes = {
    active: PropTypes.bool,
    label: PropTypes.string,
    time: PropTypes.number.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      timeValue: 1
    };
    this.animateBar = ::this.animateBar;
  }

  ease (t) {
    return (--t) * t * t + 1;
  }

  getColor (t) {
    return `hsl(${t * 120}, 50%, 50%)`;
  }

  animateBar () {
    if (this.unmounted) {
      return;
    }

    const { start } = this.state;
    const { time } = this.props;
    const now = Date.now();

    if (now < start + time) {
      this.currentFrame = requestAnimationFrame(this.animateBar);
    }

    this.setState({
      timeValue:  1 - Math.min((now - start) / time, 1)
    });
  }

  startIfActive (active) {
    if (active) {
      this.setState({
        timeValue: 1,
        start: Date.now()
      });

      this.currentFrame = requestAnimationFrame(this.animateBar);
    }
  }

  componentWillReceiveProps ({ active }) {
    this.startIfActive(active);
  }

  componentDidMount () {
    this.startIfActive(this.props.active);
  }

  componentWillUnmount () {
    this.unmounted = true;
  }

  renderTime () {
    const { timeValue } = this.state;
    const { label } = this.props;
    const barStyle = {
      clipPath: `inset(0px ${(1 - timeValue) * 100}% 0px 0px)`,
      backgroundColor: this.getColor(timeValue)
    };

    return <div className='time__bar' style={barStyle}>
      <div className='time__label time__label--white'>{label}</div>
    </div>;
  }

  render () {
    const { label } = this.props;

    return <div className='time'>
      <div className='time__label'>{label}</div>
      { this.renderTime() }
    </div>;
  }
}
