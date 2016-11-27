import taskSequence from './TaskSequence';
import taskProvider from '../providers/TaskProvider';
import stepProvider from '../providers/StepProvider';
import config from '../config';
import _ from 'lodash';

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
    if (taskProvider.hasNext()) {
      let newTask = taskProvider.next(tasksState.tags);
      newTask.steps = stepProvider.getSteps(newTask.steps);
      newTask.currentStepIndex = 0;
      newTask.id = taskSequence.nextTask();
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
