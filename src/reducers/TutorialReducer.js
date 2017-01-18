import * as tutorialActions from '../actions/TutorialActions';
import { first } from 'lodash';

const tutorialsQueue = ['intro', 'taskList', 'console', 'tree'];
const initialState = {
  current: first(tutorialsQueue)
};

export default function tutorialReducer (state = initialState, { type, payload }) {
  if (type === tutorialActions.CLOSE_TUTORIAL) {
    return {
      current: tutorialsQueue[tutorialsQueue.indexOf(state.current) + 1]
    };
  }

  return state;
}
