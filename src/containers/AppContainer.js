import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import Canvas from '../components/Canvas';
import BottomDrawer from '../components/BottomDrawer';
import TaskList from './TaskList';
import Points from '../components/Points';
import Tree from '../components/Tree';
import './App.scss';

class AppContainer extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <div className='app'>
          <Canvas id='renderCanvas' store={this.props.store} />
          <Points />
          <TaskList />
          <BottomDrawer />
          <Tree />
        </div>
      </Provider>
    );
  }
}

export default AppContainer;
