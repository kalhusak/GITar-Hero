import React, { Component, PropTypes } from 'react';
import * as tutorials from './tutorials';
import './Tutorial.scss';

export default class Tutorial extends Component {
  static propTypes = {
    show: PropTypes.string,
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

  renderOverlay () {
    if (this.props.show) {
      return <div className='tutorial__overlay tutorial__active-item' />;
    }
  }

  renderTutorialBox () {
    if (this.props.show) {
      const tutorial = tutorials[this.props.show];

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
    return <div className={'tutorial' + (this.props.show ? ' tutorial--active' : '')}>
      {this.renderOverlay()}
      {this.renderTutorialBox()}
      {this.props.children}
    </div>;
  }
}
