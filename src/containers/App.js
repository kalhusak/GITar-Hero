import React, { Component, PropTypes } from 'react';
import { Provider, connect } from 'react-redux';
import Canvas from './Canvas';
import BottomDrawer from './BottomDrawer';
import CurrentTask from './CurrentTask';
import Top from './Top';
import Tree from './Tree';
import Summary from './Summary';
import Tutorial from './Tutorial';
import BlurItem from '../components/BlurItem';
import './App.scss';

class App extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  blurComponent (tutorialName) {
    return this.props.tutorial && this.props.tutorial !== tutorialName ||
      this.props.helpDrawer.isOpen && tutorialName !== 'console';
  }

  disableComponent () {
    return Boolean(this.props.tutorial);
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <div className='app'>
          <BlurItem blur={this.blurComponent()} active={!this.disableComponent()}>
            <Canvas store={this.props.store} />
          </BlurItem>
          <BlurItem blur={this.blurComponent()} active={!this.disableComponent()}>
            <Top />
          </BlurItem>
          <BlurItem blur={this.blurComponent('tree')} active={!this.disableComponent()}>
            <Tree />
          </BlurItem>
          <BlurItem blur={this.blurComponent('taskList')} active={!this.disableComponent()}>
            <CurrentTask />
          </BlurItem>
          <BlurItem blur={this.blurComponent('console')} active={!this.disableComponent()}>
            <BottomDrawer />
          </BlurItem>
          <Tutorial />
          <Summary />
        </div>
      </Provider>
    );
  }
}

export default connect(({ tutorial, helpDrawer }) => {
  return {
    tutorial: tutorial.current,
    helpDrawer
  };
})(App);
