import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import Canvas from '../components/Canvas';
import Console from '../components/Console';
import TaskList from './TaskList';
import Points from '../components/Points';

class AppContainer extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props);
    this.state = {
      points: 0
    };
    setTimeout(() => {
      this.setState({
        points: 100
      });
    }, 2000);
    setTimeout(() => {
      this.setState({
        points: 300
      });
    }, 3000);
    setTimeout(() => {
      this.setState({
        points: 500
      });
    }, 5000);
    setTimeout(() => {
      this.setState({
        points: 200
      });
    }, 6000);
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <div style={{ height: '100%' }}>
          <Canvas id='renderCanvas' store={this.props.store} />
          <Points value={this.state.points} time={2000} />
          <Console />
          <TaskList />
        </div>
      </Provider>
    );
  }
}

export default AppContainer;
