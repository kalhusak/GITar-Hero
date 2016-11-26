import * as commandActions from '../actions/CommandActions';
import * as taskActions from '../actions/TaskActions';
import TaskUtils from '../utils/TaskUtils';

export default ({ getState }) => (next) => (action) => {
  next(action);
  if (action.type === commandActions.NEW_VALID_COMMAND) {
    action = getNextAction(getState());
    if (action) {
      next(action);
    }
  }
};

function getNextAction (state) {
  var currentStep = TaskUtils.getCurrentStep(state.tasks);
  return !currentStep ? taskActions.lastStepExecuted() : null;
}
