import { cloneDeep } from 'lodash';
import * as commandActions from '../actions/CommandActions';
import * as helpDrawerActions from '../actions/HelpDrawerActions';

const initialState = {
  isOpen: false,
  selectedTab: 'repo'
};

export default function helpDrawerReducer (state = initialState, { type, payload }) {
  const newState = cloneDeep(state);

  switch (type) {
    case helpDrawerActions.SELECT_HELP_DRAWER_TAB:
      newState.isOpen = true;
      newState.selectedTab = payload.tab;
      return newState;

    case helpDrawerActions.CLOSE_HELP_DRAWER:
      newState.isOpen = false;
      return newState;

    case commandActions.NEW_INVALID_COMMAND:
      if (payload.command === 'help') {
        newState.isOpen = !newState.isOpen;
        return newState;
      }
      return state;

    default:
      return state;
  }
}
