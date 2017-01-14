import React, { Component } from 'react';
import { Engine3D } from '../../engine3D';
import * as commandActions from '../../actions/CommandActions';
import './Canvas.scss';

class Canvas extends Component {

  constructor (props) {
    super(props);

    this.onStateChange = ::this.onStateChange;
  }

  shouldComponentUpdate () {
    return false;
  }

  componentDidMount () {
    var canvas = document.getElementById(this.props.id);
    // width and height from css are loaded after creating engine and then is small resolution
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    this.engine = new Engine3D(canvas);
    this.props.store.subscribe(this.onStateChange);
  }

  onStateChange () {
    var lastAction = this.props.store.getState().lastAction;
    if (lastAction.type === commandActions.NEW_VALID_COMMAND) {
      const { type, data } = lastAction.payload.step;
      this.engine.onNewValidCommand(type, data);
    } else if (lastAction.type === commandActions.NEW_INVALID_COMMAND) {
      this.engine.onNewInvalidCommand();
    }
  }

  render () {
    return (<canvas id={this.props.id} className='renderCanvas' />);
  }

};

Canvas.propTypes = {
  id: React.PropTypes.string
};

export default Canvas;
