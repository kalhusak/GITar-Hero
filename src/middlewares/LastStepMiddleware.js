import * as taskActions from '../actions/TaskActions';
import * as TaskUtils from '../utils/TaskUtils';
import config from '../config';

export default ({ getState }) => (next) => (action) => {
  next(action);
  if (action.type === taskActions.LAST_STEP_EXECUTED) {
    var state = getState();

    var currentTask = TaskUtils.getCurrentTask(state.tasks);
    if (!currentTask) {
      next(taskActions.lastTaskExecuted());
    }

    if (TaskUtils.getTasksSize(state.tasks) < config.taskListSize) {
      next(taskActions.tooFewTasks());
    }
  }
};
