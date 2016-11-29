import config from '../config';
import _ from 'lodash';
import taskFactory from '../factories/TaskFactory';

export function getCurrentTask (tasksState) {
  return tasksState.byId[tasksState.current];
}

export function getCurrentStep (tasksState) {
  var task = getCurrentTask(tasksState);
  return task ? task.steps[task.currentStepIndex] : undefined;
}

export function getTasksSize (tasksState) {
  return Object.keys(tasksState.byId).length;
}

export function fillTaskList (tasksState) {
  let howManyAdd = config.task_list_size - getTasksSize(tasksState);

  for (let i = 0; i < howManyAdd; i++) {
    let newTask = taskFactory.next(tasksState.tags);
    if (newTask) {
      tasksState.byId[newTask.id] = newTask;
    }
  }
}

export function deleteCurrentTask (tasksState) {
  _.unset(tasksState.byId, tasksState.current);
}

export default {
  getCurrentTask,
  getCurrentStep,
  deleteCurrentTask,
  getTasksSize,
  fillTaskList
};
