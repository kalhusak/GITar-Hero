import * as commandActions from '../actions/CommandActions';
import * as taskActions from '../actions/TaskActions';
import TaskUtils from '../utils/TaskUtils';

export default ({ getState }) => (next) => (action) => {
  if (action.type === commandActions.NEW_VALID_COMMAND) {
    next(action);
    action = getNextAction(getState());
    if (action) {
      next(action);
    }
  } else {
    next(action);
  }
};

function getNextAction (state) {
  var currentStep = TaskUtils.getCurrentStep(state.tasks.steps);
  if (currentStep == null) {
    return taskActions.lastStepExecuted();
  }
  return null;
}
