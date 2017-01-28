import * as tutorialActions from '../actions/TutorialActions';
import { tooFewTasks } from '../actions/TaskActions';
import { showHelpDrawerInfo } from '../actions/HelpDrawerActions';

export default ({ getState }) => (next) => (action) => {
  next(action);
  if (action.type === tutorialActions.CLOSE_TUTORIAL) {
    if (!getState().tutorial.current) {
      next(tooFewTasks());
      next(showHelpDrawerInfo('repo'));
    }
  }
};
