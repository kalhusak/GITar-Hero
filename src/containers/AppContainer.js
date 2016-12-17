import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import Canvas from '../components/Canvas';
import Console from '../components/Console';
import TaskList from './TaskList';
import Points from '../components/Points';
import Time from '../components/Time';

class AppContainer extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props);
    this.state = {
      points: 0,
      time: 0
    };
    setTimeout(() => {
      this.setState({
        points: 0,
        time: 10000
      });
    });
    setTimeout(() => {
      this.setState({
        points: 200,
        time: 8000
      });
    }, 6000);
    setTimeout(() => {
      this.setState({
        points: 400
      });
    }, 10000);
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <div style={{ height: '100%' }}>
          <Canvas id='renderCanvas' store={this.props.store} />
          <Points value={this.state.points} />
          <Time time={this.state.time} />
          <Console />
          <TaskList />
        </div>
      </Provider>
    );
  }
}

export default AppContainer;
