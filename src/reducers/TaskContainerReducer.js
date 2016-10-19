import * as actions from '../actions/CommandActions'

const defaultState = {
  tasks: []
}

export default function taskContainerReducer(state = defaultState, action) {
  switch (action.type) {
    case actions.NEW_VALID_COMMAND:
      return state;
    default:
      return state;
  }
}
