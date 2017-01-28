import { cloneDeep, findIndex } from 'lodash';
import * as commandActions from '../actions/CommandActions';
import * as helpDrawerActions from '../actions/HelpDrawerActions';
import helpTabs from '../containers/BottomDrawer/helpTabs';

const initialState = {
  isOpen: false,
  info: false,
  selectedTab: 'repo'
};

export default function helpDrawerReducer (state = initialState, { type, payload }) {
  const newState = cloneDeep(state);

  switch (type) {
    case helpDrawerActions.SELECT_HELP_DRAWER_TAB:
      newState.selectedTab = payload.tab;
      return newState;

    case helpDrawerActions.OPEN_HELP_DRAWER:
      newState.isOpen = true;
      newState.info = false;
      return newState;

    case helpDrawerActions.CLOSE_HELP_DRAWER:
      newState.isOpen = false;
      return newState;

    case helpDrawerActions.TOGGLE_HELP_DRAWER:
      newState.isOpen = !newState.isOpen;
      return newState;

    case helpDrawerActions.SHOW_HELP_DRAWER_INFO:
      newState.info = true;
      newState.selectedTab = payload.tab;
      return newState;

    case commandActions.NEW_VALID_COMMAND:
      newState.info = false;
      return newState;

    case helpDrawerActions.NEXT_HELP_DRAWER_TAB:
      const nextTabIndex = findIndex(helpTabs, { name: state.selectedTab }) + 1;
      if (state.isOpen && nextTabIndex < helpTabs.length) {
        newState.selectedTab = helpTabs[nextTabIndex].name;
        return newState;
      }
      return state;

    case helpDrawerActions.PREV_HELP_DRAWER_TAB:
      const prevTabIndex = findIndex(helpTabs, { name: state.selectedTab }) - 1;
      if (state.isOpen && prevTabIndex >= 0) {
        newState.selectedTab = helpTabs[prevTabIndex].name;
        return newState;
      }
      return state;

    default:
      return state;
  }
}
