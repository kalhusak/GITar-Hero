import config from '../config';
import { unset, first } from 'lodash';
import taskFactory from '../factories/TaskFactory';

export function getCurrentTask (tasksState) {
  return tasksState.byId[tasksState.current];
}

export function getNextTask (tasksState) {
  return tasksState.byId[tasksState.current + 1];
}

export function getCurrentStep (tasksState) {
  let task = getCurrentTask(tasksState);
  let step = task.steps[task.currentStepIndex];

  if (!step) {
    task = getNextTask(tasksState);
    return task && first(task.steps);
  }

  return step;
}

export function getTasksSize (tasksState) {
  return Object.keys(tasksState.byId).length;
}

export function fillTaskList (tasksState) {
  let howManyAdd = config.taskListSize - getTasksSize(tasksState);

  for (let i = 0; i < howManyAdd; i++) {
    let newTask = taskFactory.next(tasksState.tags);
    if (newTask) {
      tasksState.byId[newTask.id] = newTask;
    }
  }
}

export function deleteCurrentTask (tasksState) {
  unset(tasksState.byId, tasksState.current);
}
