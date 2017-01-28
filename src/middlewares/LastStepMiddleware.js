import * as taskActions from '../actions/TaskActions';
import * as TaskUtils from '../utils/TaskUtils';
import config from '../config';

export default ({ getState }) => (next) => (action) => {
  next(action);
  if (action.type === taskActions.LAST_STEP_EXECUTED) {
    if (TaskUtils.getTasksSize(getState().tasks) < config.taskListSize) {
      next(taskActions.tooFewTasks());
    }

    if (!TaskUtils.getCurrentTask(getState().tasks)) {
      next(taskActions.lastTaskExecuted());
    }
  }
};
