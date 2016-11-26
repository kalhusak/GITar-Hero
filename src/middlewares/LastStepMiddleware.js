import * as taskActions from '../actions/TaskActions';
import TaskUtils from '../utils/TaskUtils';
import config from '../config';

export default ({ getState }) => (next) => (action) => {
  next(action);
  if (action.type === taskActions.LAST_STEP_EXECUTED) {
    var state = getState();

    var currentTask = TaskUtils.getCurrentTask(state.tasks);
    if (!currentTask) {
      next(taskActions.lastTaskExecuted());
    }

    if (TaskUtils.getTasksSize(state.tasks) < config.task_list_size) {
      next(taskActions.tooFewTasks());
    }
  }
};
