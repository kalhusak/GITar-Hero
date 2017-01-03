import * as commandActions from '../actions/CommandActions';
import * as taskActions from '../actions/TaskActions';
import * as TaskUtils from '../utils/TaskUtils';
import TagUtils from '../utils/TagUtils';
import _ from 'lodash';

export default function tasksReducers (state = {}, action) {
  switch (action.type) {
    case commandActions.NEW_VALID_COMMAND:
      return onNewValidCommand(_.cloneDeep(state));
    case taskActions.LAST_STEP_EXECUTED:
      return onLastStepExecuted(_.cloneDeep(state));
    case taskActions.TOO_FEW_TASKS:
      return onTooFewTasks(_.cloneDeep(state));
    case commandActions.NEW_INVALID_COMMAND:
      return onNewInvalidCommand(_.cloneDeep(state));
    default:
      return state;
  }
}

function onNewValidCommand (state) {
  var task = TaskUtils.getCurrentTask(state);
  TagUtils.onValidCommand(state);
  task.currentStepIndex++;
  return state;
}

function onLastStepExecuted (state) {
  TaskUtils.deleteCurrentTask(state);
  state.current++;
  state.startTime = Date.now();
  return state;
}

function onTooFewTasks (state) {
  TaskUtils.fillTaskList(state);
  return state;
}

function onNewInvalidCommand (state) {
  TagUtils.onInvalidCommand(state);
  return state;
}
