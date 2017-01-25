import * as commandActions from '../actions/CommandActions';
import * as taskActions from '../actions/TaskActions';
import * as TaskUtils from '../utils/TaskUtils';
import * as tutorialActions from '../actions/TutorialActions';
import TagUtils from '../utils/TagUtils';
import { cloneDeep } from 'lodash';

export default function tasksReducers (state = {}, action) {
  switch (action.type) {
    case tutorialActions.CLOSE_TUTORIAL:
      return onTutorialFinished(cloneDeep(state));
    case commandActions.NEW_VALID_COMMAND:
      return onNewValidCommand(cloneDeep(state));
    case commandActions.ACTIVATE_NEXT_STEP:
      return onActivateNextStep(cloneDeep(state));
    case taskActions.LAST_STEP_EXECUTED:
      return onLastStepExecuted(cloneDeep(state));
    case taskActions.TOO_FEW_TASKS:
      return onTooFewTasks(cloneDeep(state));
    case commandActions.NEW_INVALID_COMMAND:
      return onNewInvalidCommand(cloneDeep(state));
    default:
      return state;
  }
}

function onTutorialFinished (state) {
  state.startTime = Date.now();
  return state;
}

function onNewValidCommand (state) {
  const task = TaskUtils.getCurrentTask(state);
  TagUtils.onValidCommand(state);
  task.currentStepIndex++;
  return state;
}

function onActivateNextStep (state) {
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
