import * as commandActions from '../actions/CommandActions';
import * as taskActions from '../actions/TaskActions';
import TaskUtils from '../utils/TaskUtils';
import _ from 'lodash';

const defaultState = {
  current: '0',
  list: {},
  steps: {
    current: '0',
    list: {}
  },
  // TODO pimosa remove it. its only for test
  i: 3
};

export default function tasksReducers (state = defaultState, action) {
  switch (action.type) {
    case commandActions.NEW_VALID_COMMAND:
      var newState = _.cloneDeep(state);
      return onNewValidCommand(newState);
    case taskActions.LAST_STEP_EXECUTED:
      var newState = _.cloneDeep(state);
      return onLastStepExecuted(newState);
    case taskActions.TOO_FEW_TASKS:
      var newState = _.cloneDeep(state);
      return onTooFewTasks(newState);
    default:
      return state;
  }
}

function onNewValidCommand (state) {
  TaskUtils.setCurrentStepExecuted(state.steps);
  TaskUtils.setCurrentStepOnNext(state);
  return state;
}

function onLastStepExecuted (state) {
  TaskUtils.deleteCurrentTask(state);
  TaskUtils.setCurrentTaskOnNext(state);
  return state;
}

function onTooFewTasks (state) {
  TaskUtils.fillTaskList(state);
  return state;
}
