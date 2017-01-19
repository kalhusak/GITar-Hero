import React, { Component, PropTypes } from 'react';
import { Provider, connect } from 'react-redux';
import Canvas from '../components/Canvas';
import BottomDrawer from './BottomDrawer';
import TaskList from './TaskList';
import Points from './Points';
import Tree from './Tree';
import TutorialItem from '../components/TutorialItem';
import Tutorial from '../components/Tutorial';
import { closeTutorial } from '../actions/TutorialActions';
import './App.scss';

class AppContainer extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props);
    this.onTutorialClose = ::this.onTutorialClose;
  }

  onTutorialClose () {
    this.props.dispatch(closeTutorial());
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <div className='app'>
          <Tutorial show={this.props.tutorial} onClose={this.onTutorialClose}>
            <Canvas id='renderCanvas' store={this.props.store} />
            <Points />
            <TutorialItem enabled={this.props.tutorial === 'taskList'}>
              <TaskList />
            </TutorialItem>
            <TutorialItem enabled={this.props.tutorial === 'console'}>
              <BottomDrawer />
            </TutorialItem>
            <TutorialItem enabled={this.props.tutorial === 'tree'}>
              <Tree />
            </TutorialItem>
          </Tutorial>
        </div>
      </Provider>
    );
  }
}

export default connect(state => ({ tutorial: state.tutorial.current }))(AppContainer);
