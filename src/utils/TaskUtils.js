import _ from 'lodash';

// TODO add steps remove ?? steps can be the same in different tasks ?

export function getCurrentTask (tasks) {
  return tasks.list[tasks.current];
}

export function getCurrentStep (steps) {
  return steps.list[steps.current];
}

export function setCurrentStepExecuted (tasks) {
  var taskSteps = getCurrentTask(tasks).steps;
  var currentStep = getCurrentStep(tasks.steps);
  currentStep.executed = true;

  if (currentStep.id !== _.last(taskSteps)) {
    tasks.steps.current = taskSteps[taskSteps.indexOf(tasks.steps.current) + 1];
  }
}

export function deleteCurrentTaskAndStepsIfCompleted (tasks) {
  var taskSteps = getCurrentTask(tasks).steps;
  if (_.last(taskSteps) === tasks.steps.current) {
    var currentStep = getCurrentStep(tasks.steps);
    if (currentStep.executed) {
      deleteCurrentTask(tasks);
      initCurrentOfTasksAndSteps(tasks);
    }
  }
}

function deleteCurrentTask (tasks) {
  _.unset(tasks.list, tasks.current);
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
  deleteCurrentTaskAndStepsIfCompleted,
  getStepsByTask
};
