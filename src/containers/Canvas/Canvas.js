import React, { Component, PropTypes } from 'react';
import { Engine3D } from '../../engine3D';
import * as commandActions from '../../actions/CommandActions';
import './Canvas.scss';

export default class Canvas extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
    this.onStateChange = ::this.onStateChange;
  }

  shouldComponentUpdate () {
    return false;
  }

  onStateChange () {
    const { lastAction } = this.props.store.getState();

    if (lastAction.type === commandActions.NEW_VALID_COMMAND) {
      const { type, data } = lastAction.payload.step;
      this.engine.onNewValidCommand(type, data);
    } else if (lastAction.type === commandActions.NEW_INVALID_COMMAND) {
      this.engine.onNewInvalidCommand();
    }
  }

  componentDidMount () {
    this.refs.canvas.style.width = '100%';
    this.refs.canvas.style.height = '100%';
    this.engine = new Engine3D(this.refs.canvas);
    this.props.store.subscribe(this.onStateChange);
  }

  render () {
    return <canvas ref='canvas' className='canvas' />;
  }
};
