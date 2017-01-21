import * as taskActions from '../actions/TaskActions';
import * as commandActions from '../actions/CommandActions';
import { cloneDeep } from 'lodash';

const penalty = 50;

export default function pointsReducer (state = {}, action) {
  switch (action.type) {
    case taskActions.LAST_STEP_EXECUTED:
      return onAddPoints(cloneDeep(state), action.payload.reward);
    case commandActions.NEW_INVALID_COMMAND:
      return onSubtractPoints(cloneDeep(state));
    default:
      return state;
  }
}

function onAddPoints (state, amount) {
  state.value = state.value + amount || 0;
  return state;
}

function onSubtractPoints (state) {
  state.value = state.value - penalty > 0 ? state.value - penalty : 0;
  return state;
}
