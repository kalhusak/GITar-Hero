import { createAction } from '../utils';

export const LAST_STEP_EXECUTED = 'LAST_STEP_EXECUTED';
export const LAST_TASK_EXECUTED = 'LAST_TASK_EXECUTED';
export const TOO_FEW_TASKS = 'TOO_FEW_TASKS';

export function lastStepExecuted (reward) {
  return createAction(LAST_STEP_EXECUTED, { reward });
}

export function lastTaskExecuted () {
  return createAction(LAST_TASK_EXECUTED, {});
}

export function tooFewTasks () {
  return createAction(TOO_FEW_TASKS, {});
}
