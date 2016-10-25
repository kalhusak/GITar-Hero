import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/ConsoleActions';
import './Console.scss';

class Console extends Component {

  constructor (props) {
    super(props);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onKeyPress (event) {
    if (event.keyCode === 13) { // ENTER
      const { dispatch } = this.props;
      let command = document.getElementById('console').value;
      let action = actions.newCommand(command);
      dispatch(action);
      return false;
    }
    return true;
  }

  render () {
    console.log('RENDER CONSOLE');
    return (
      <div>
        <textarea id='console' rows='4' cols='50' className='console'
          onKeyDown={this.onKeyPress} />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    console: state.console
  };
};

export default connect(mapStateToProps)(Console);
