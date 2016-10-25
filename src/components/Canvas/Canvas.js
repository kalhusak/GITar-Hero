import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Engine3D } from '../../engine3D';
import './Canvas.scss';

class Canvas extends Component {

  shouldComponentUpdate () {
    return false;
  }

  componentDidMount () {
    var canvas = document.getElementById(this.props.id);
    // width and height from css are loaded after creating engine and then is small resolution
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    this.engine = new Engine3D(canvas);
    this.props.store.subscribe(this.engine.onStateChange);
  }

  render () {
    return (<canvas id={this.props.id} className='renderCanvas' />);
  }
};

Canvas.propTypes = {
  id: React.PropTypes.string
};

const mapStateToProps = (state) => {};

export default connect(mapStateToProps)(Canvas);
