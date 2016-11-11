import { createAction } from '../utils';

export const NEW_COMMAND = 'NEW_COMMAND';

export function newCommand (command) {
  return createAction(NEW_COMMAND, {
    command
  });
}
