import { createAction } from '../utils';

export const ENTER_COMMAND = 'ENTER_COMMAND';

export function enterCommand (command) {
  return createAction(ENTER_COMMAND, { command });
};
