import * as taskActions from '../actions/TaskActions';
import TaskUtils from '../utils/TaskUtils';

export default ({ getState }) => (next) => (action) => {
  if (action.type === taskActions.LAST_STEP_EXECUTED) {
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
  var currentTask = TaskUtils.getCurrentTask(state.tasks);
  if (currentTask == null) {
    return taskActions.lastTaskExecuted();
  }
  return null;
}
