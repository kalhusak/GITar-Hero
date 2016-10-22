import React, {Component, PropTypes} from 'react'
import {Provider} from 'react-redux'
import Canvas from '../components/Canvas'
import Console from '../components/Console'
import TaskList from './TaskList'
class AppContainer extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  render() {
    console.log(TaskList);
    return (
      <Provider store={this.props.store}>
        <div style={{ height: '100%' }}>
          <Canvas id="renderCanvas" store={this.props.store}/>
          <Console/>
          <TaskList />
        </div>
      </Provider>
    )
  }
}

export default AppContainer
