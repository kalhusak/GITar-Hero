import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import Canvas from '../components/Canvas';
import BottomDrawer from '../components/BottomDrawer';
import TaskList from './TaskList';
import Points from '../components/Points';
import Tree from '../components/Tree';
import TutorialItem from '../components/TutorialItem';
import Tutorial from '../components/Tutorial';
import './App.scss';

class AppContainer extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <div className='app'>
          <Tutorial>
            <Canvas id='renderCanvas' store={this.props.store} />
            <Points />
            <TutorialItem name='taskList'>
              <TaskList />
            </TutorialItem>
            <TutorialItem name='console'>
              <BottomDrawer />
            </TutorialItem>
            <TutorialItem name='tree'>
              <Tree />
            </TutorialItem>
            <TutorialItem name='intro' />
          </Tutorial>
        </div>
      </Provider>
    );
  }
}

export default AppContainer;
