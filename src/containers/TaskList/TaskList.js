import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TaskList.scss';
import Task from '../../components/Task';
import TaskUtils from '../../utils/TaskUtils';
import _ from 'lodash';
import { TransitionMotion, spring } from 'react-motion';

class TaskList extends Component {

  getDefaultStyles () {
    return this.props.tasks.map((task) => ({ ...task, style: { opacity: 0 } }));
  }

  getStyles () {
    return this.props.tasks.map((task) => ({ ...task, style: { opacity: spring(1) } }));
  }

  mapStylesToTask (styles) {
    return styles.map(({ key, data, style }, index) =>
      <li key={key} style={style}>
        <Task task={data.task} />
      </li>);
  }

  willEnter () {
    return {
      height: 0,
      opacity: 0
    };
  }

  willLeave () {
    return {
      height: spring(0),
      opacity: spring(0)
    };
  }

  render () {
    return (
      <div className='taskList'>
        <TransitionMotion
          defaultStyles={this.getDefaultStyles()}
          styles={this.getStyles()}
          willLeave={this.willLeave}
          willEnter={this.willEnter}
          >
          { styles =>
            <ul className='tasks-list'>
              {this.mapStylesToTask(styles)}
            </ul>
           }
        </TransitionMotion>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    tasks: _.reverse(_.slice(Object.values(state.tasks.byId))).map((task) =>
      ({ key: task.id, data: { task } }))
  };
};

export default connect(mapStateToProps)(TaskList);
