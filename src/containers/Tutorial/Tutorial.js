import React, { Component } from 'react';
import { connect } from 'react-redux';
import { assign } from 'lodash';
import { closeTutorial } from '../../actions/TutorialActions';
import Panel from '../../components/Panel';
import * as tutorials from './tutorials';
import './Tutorial.scss';

class Tutorial extends Component {
  constructor (props) {
    super(props);
    this.handleKeyDown = ::this.handleKeyDown;
    this.onCloseTutorial = ::this.onCloseTutorial;
    this.state = { animate: false };
  }

  onCloseTutorial () {
    this.props.dispatch(closeTutorial());
  }

  handleKeyDown ({ keyCode }) {
    const [CODE_ESC, CODE_ENTER] = [27, 13];
    if (this.props.tutorial && (keyCode === CODE_ESC || keyCode === CODE_ENTER)) {
      this.onCloseTutorial();
    }
  }

  componentDidMount () {
    document.body.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount () {
    document.body.removeEventListener('keydown', this.handleKeyDown);
  }

  componentWillReceiveProps ({ tutorial }) {
    if (tutorial && this.props.tutorial !== tutorial) {
      this.setState({ animate: true });
      setTimeout(() => {
        this.setState({ animate: false });
      }, 300);
    }
  }

  render () {
    if (this.props.tutorial) {
      const tutorial = tutorials[this.props.tutorial];

      if (tutorial) {
        return <Panel title={tutorial.title} style={tutorial.style}
          className={'tutorial' + (this.state.animate ? ' tutorial--animate' : '')}>
          {tutorial.template}
          <div className='tutorial__button-container'>
            <button className='tutorial__button' onClick={this.onCloseTutorial}>
              {tutorial.button}
            </button>
          </div>
        </Panel>;
      }
    }
    return null;
  }
}

export default connect(({ tutorial }) => ({ tutorial: tutorial.current }))(Tutorial);
