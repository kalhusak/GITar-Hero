import { createAction } from '../utils';

export const OPEN_HELP_DRAWER = 'OPEN_HELP_DRAWER';
export const CLOSE_HELP_DRAWER = 'CLOSE_HELP_DRAWER';
export const TOGGLE_HELP_DRAWER = 'TOGGLE_HELP_DRAWER';

export const openHelpDrawer = () => createAction(OPEN_HELP_DRAWER);
export const closeHelpDrawer = () => createAction(CLOSE_HELP_DRAWER);
export const toggleHelpDrawer = () => createAction(TOGGLE_HELP_DRAWER);
