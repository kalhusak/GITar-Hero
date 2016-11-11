import * as taskActions from '../actions/TaskActions';
import TaskUtils from '../utils/TaskUtils';
import config from '../config';

export default ({ getState }) => (next) => (action) => {
  next(action);
  if (isTooFewTasks(getState().tasks)) {
    action = taskActions.tooFewTasks();
    next(action);
  }
};

function isTooFewTasks (state) {
  return TaskUtils.getTasksSize(state) < config.task_list_size;
}
