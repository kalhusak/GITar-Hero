import * as taskActions from '../actions/TaskActions';
import { cloneDeep } from 'lodash';

export default function pointsReducer (state = {}, action) {
  switch (action.type) {
    case taskActions.LAST_STEP_EXECUTED:
      return onAddPoints(cloneDeep(state), action.payload.reward);
    default:
      return state;
  }
}

function onAddPoints (state, amount) {
  state.value = state.value + amount || 0;
  return state;
}
