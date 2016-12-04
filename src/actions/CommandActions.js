import { createAction } from '../utils';

export const NEW_VALID_COMMAND = 'NEW_VALID_COMMAND';
export const NEW_INVALID_COMMAND = 'NEW_INVALID_COMMAND';

export function newValidCommand (command, step) {
  return createAction(NEW_VALID_COMMAND, {
    command,
    step
  });
}

export function newInvalidCommand (command) {
  return createAction(NEW_INVALID_COMMAND, {
    command
  });
}
