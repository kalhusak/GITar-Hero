import { createAction } from '../tools';

export const LAST_STEP_EXECUTED = 'LAST_STEP_EXECUTED';
export const LAST_TASK_EXECUTED = 'LAST_TASK_EXECUTED';

export function lastStepExecuted () {
  return createAction(LAST_STEP_EXECUTED, {});
}

export function lastTaskExecuted () {
  return createAction(LAST_TASK_EXECUTED, {});
}
