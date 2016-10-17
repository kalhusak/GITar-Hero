import React, {Component, PropTypes} from 'react'
import {Provider} from 'react-redux'
import Canvas from '../components/Canvas'
import Console from '../components/Console'

class AppContainer extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <div style={{ height: '100%' }}>
          <Canvas id="renderCanvas"/>
          <Console/>
        </div>
      </Provider>
    )
  }
}

export default AppContainer
