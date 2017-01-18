import { createAction } from '../utils';

export const CLOSE_TUTORIAL = 'closeTutorial';

export const closeTutorial = () => createAction(CLOSE_TUTORIAL);
