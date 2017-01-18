import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeTutorial } from '../../actions/TutorialActions';
import './Tutorial.scss';

class Tutorial extends Component {
  constructor (props) {
    super(props);
    this.handleKeyDown = ::this.handleKeyDown;
  }

  handleKeyDown ({ keyCode }) {
    const [CODE_ESC, CODE_ENTER] = [27, 13];
    if (this.props.tutorial && (keyCode === CODE_ESC || keyCode === CODE_ENTER)) {
      this.props.dispatch(closeTutorial());
    }
  }

  componentDidMount () {
    document.body.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount () {
    document.body.removeEventListener('keydown', this.handleKeyDown);
  }

  render () {
    return <div className={'tutorial' + (this.props.tutorial ? ' tutorial--active' : '')}>
      {this.props.tutorial ? <div className='tutorial__overlay' /> : ''}
      {this.props.children}
    </div>;
  }
}

export default connect(({ tutorial: { current } }) => ({ tutorial: current }))(Tutorial);
