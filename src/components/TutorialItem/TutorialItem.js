import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { closeTutorial } from '../../actions/TutorialActions';
import './TutorialItem.scss';
import * as tutorials from './tutorials';

class TutorialItem extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired
  };

  constructor (props) {
    super(props);
    this.closeTutorial = ::this.closeTutorial;
  }

  closeTutorial () {
    this.props.dispatch(closeTutorial());
  }

  renderTutorialBox () {
    const tutorial = tutorials[this.props.name];
    return <div className='tutorial-item__box' style={tutorial.style}>
      <div className='tutorial-item__inner'>
        {tutorial.template}
      </div>
      <button className='tutorial-item__button' onClick={this.closeTutorial}>
        {tutorial.button}
      </button>
    </div>;
  }

  render () {
    const active = this.props.tutorial === this.props.name;

    return <div className={'tutorial-item' + (active ? ' tutorial-item--active' : '')}>
      {active ? this.renderTutorialBox() : null}
      {this.props.children}
    </div>;
  }
}

export default connect(({ tutorial: { current } }) => ({ tutorial: current }))(TutorialItem);
