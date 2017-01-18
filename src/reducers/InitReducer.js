import * as TaskUtils from '../utils/TaskUtils';
import _ from 'lodash';

const defaultState = {
  console: {
    commands: []
  },
  tasks: {
    current: 0,
    byId: {},
    tags: {},
    startTime: 0
  },
  points: {
    value: 0
  }
};

export default function initReducer (state = defaultState, action) {
  switch (action.type) {
    case '@@INIT':          // for CHROME
      return onTooFewTasks(_.cloneDeep(state));
    case '@@redux/INIT':    // for FIREFOX
      return onTooFewTasks(_.cloneDeep(state));
    default:
      return state;
  }
}

function onTooFewTasks (state) {
  TaskUtils.fillTaskList(state.tasks);
  return state;
}
