import React, { Component, PropTypes } from 'react';
import * as tutorials from './tutorials';
import './Tutorial.scss';

export default class Tutorial extends Component {
  static propTypes = {
    blur: PropTypes.bool,
    message: PropTypes.string,
    onClose: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.handleKeyDown = ::this.handleKeyDown;
  }

  handleKeyDown ({ keyCode }) {
    const [CODE_ESC, CODE_ENTER] = [27, 13];
    if (this.props.tutorial && (keyCode === CODE_ESC || keyCode === CODE_ENTER)) {
      this.props.onClose();
    }
  }

  componentDidMount () {
    document.body.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount () {
    document.body.removeEventListener('keydown', this.handleKeyDown);
  }

  renderTutorialBox () {
    if (this.props.message) {
      const tutorial = tutorials[this.props.message];

      if (tutorial) {
        return <div className='tutorial__box tutorial__active-item' style={tutorial.style}>
          <div className='tutorial__box-inner'>
            {tutorial.template}
          </div>
          <button className='tutorial__box-button' onClick={this.props.onClose}>
            {tutorial.button}
          </button>
        </div>;
      }
    }
  }

  render () {
    const tutorialClasses = ['tutorial'];

    if (this.props.blur) {
      tutorialClasses.push('tutorial--blur');
    }

    if (this.props.message) {
      tutorialClasses.push('tutorial--active');
    }

    return <div className={tutorialClasses.join(' ')}>
      {this.renderTutorialBox()}
      {this.props.children}
    </div>;
  }
}
