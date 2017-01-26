import { createAction } from '../utils';

export const OPEN_HELP_DRAWER = 'OPEN_HELP_DRAWER';
export const CLOSE_HELP_DRAWER = 'CLOSE_HELP_DRAWER';
export const TOGGLE_HELP_DRAWER = 'TOGGLE_HELP_DRAWER';
export const SELECT_HELP_DRAWER_TAB = 'SELECT_HELP_DRAWER_TAB';
export const NEXT_HELP_DRAWER_TAB = 'NEXT_HELP_DRAWER_TAB';
export const PREV_HELP_DRAWER_TAB = 'PREV_HELP_DRAWER_TAB';
export const SHOW_HELP_DRAWER_INFO = 'SHOW_HELP_DRAWER_INFO';

export const openHelpDrawer = () => createAction(OPEN_HELP_DRAWER);
export const closeHelpDrawer = () => createAction(CLOSE_HELP_DRAWER);
export const toggleHelpDrawer = () => createAction(TOGGLE_HELP_DRAWER);
export const nextHelpDrawerTab = () => createAction(NEXT_HELP_DRAWER_TAB);
export const prevHelpDrawerTab = () => createAction(PREV_HELP_DRAWER_TAB);
export const selectHelpDrawerTab = (tab) => createAction(SELECT_HELP_DRAWER_TAB, { tab });
export const showHelpDrawerInfo = (tab) => createAction(SHOW_HELP_DRAWER_INFO, { tab });
