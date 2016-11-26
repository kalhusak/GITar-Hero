import TaskUtils from '../utils/TaskUtils';
import _ from 'lodash';

const defaultState = {
  console: {
    commands: []
  },
  tasks: {
    current: 0,
    byId: {},
    tags: {}
  }
};

export default function initReducer (state = defaultState, action) {
  switch (action.type) {
    case '@@INIT':
      return onTooFewTasks(_.cloneDeep(state));
    default:
      return state;
  }
}

function onTooFewTasks (state) {
  TaskUtils.fillTaskList(state.tasks);
  return state;
}
