import _ from 'lodash';

// TODO add steps remove ?? steps can be the same in different tasks ?

export function getCurrentTask (tasksState) {
  return tasksState.list[tasksState.current];
}

export function getCurrentStep (steps) {
  return steps.list[steps.current];
}

export function setCurrentStepExecuted (steps) {
  var currentStep = getCurrentStep(steps);
  currentStep.executed = true;
}

export function setCurrentStepOnNext (tasksState) {
  var currentTask = getCurrentTask(tasksState);
  var currentStepId = tasksState.steps.current;
  var stepsIdsOfCurrentTask = currentTask.steps;
  var indexOfCurrentTaskStep = stepsIdsOfCurrentTask.indexOf(currentStepId);
  if (indexOfCurrentTaskStep === stepsIdsOfCurrentTask.length - 1) {
    tasksState.steps.current = null;
  } else {
    tasksState.steps.current = stepsIdsOfCurrentTask[indexOfCurrentTaskStep + 1];
  }
}

//TODO delete also steps cause 1 to many relation applied
export function deleteCurrentTask (tasksState) {
  _.unset(tasksState.list, tasksState.current);
}

export function setCurrentTaskOnNext (tasksState) {
  var tasksArray = Object.values(tasksState.list);
  if (tasksArray.length === 0) {
    tasksState.current = null;
  } else {
    tasksState.current = tasksArray[0].id;
    tasksState.steps.current = tasksArray[0].steps[0];
  }
}

export function addNewTaskToState (tasksState) {
  //TODO implement
}

function initCurrentOfTasksAndSteps (tasks) {
  var nextTask = _.values(tasks.list)[0];
  if (nextTask) {
    tasks.current = nextTask.id;
    tasks.steps.current = nextTask.steps[0];
  }
}

export function getStepsByTask (task, stepsList) {
  var taskStepIds = task.steps;
  var result = {};
  for (var stepId of taskStepIds) {
    result[stepId] = stepsList[stepId];
  }
  return result;
}

export default {
  getCurrentTask,
  getCurrentStep,
  setCurrentStepExecuted,
  setCurrentStepOnNext,
  deleteCurrentTask,
  setCurrentTaskOnNext,
  addNewTaskToState,
  getStepsByTask
};
