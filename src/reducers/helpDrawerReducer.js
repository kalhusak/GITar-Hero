import { cloneDeep, findIndex } from 'lodash';
import * as commandActions from '../actions/CommandActions';
import * as helpDrawerActions from '../actions/HelpDrawerActions';
import helpTabs from '../components/BottomDrawer/helpTabs';

const initialState = {
  isOpen: false,
  autoShowHelp: true,
  selectedTab: 'repo'
};

export default function helpDrawerReducer (state = initialState, { type, payload }) {
  const newState = cloneDeep(state);

  switch (type) {
    case helpDrawerActions.SELECT_HELP_DRAWER_TAB:
      if (state.autoShowHelp || !payload.auto || state.isOpen) {
        newState.isOpen = true;
        newState.selectedTab = payload.tab;
        return newState;
      }
      return state;

    case helpDrawerActions.CLOSE_HELP_DRAWER:
      newState.isOpen = false;
      return newState;

    case helpDrawerActions.TOGGLE_AUTO_SHOW_OPTION:
      newState.autoShowHelp = !newState.autoShowHelp;
      return newState;

    case commandActions.NEW_INVALID_COMMAND:
      if (payload.command === 'help') {
        newState.isOpen = !newState.isOpen;
        return newState;
      }
      return state;

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
