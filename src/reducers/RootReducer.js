import { combineReducers } from 'redux';
import consoleReducer from './ConsoleReducer';
import tasksReducer from './TasksReducer';
import initReducer from './InitReducer';
import lastActionReducer from './LastActionReducer';
import helpDrawerReducer from './HelpDrawerReducer';
import pointsReducer from './PointsReducer';
import treeReducer from './TreeReducer';
import tutorialReducer from './TutorialReducer';

const combine = combineReducers({
  console: consoleReducer,
  tasks: tasksReducer,
  lastAction: lastActionReducer,
  helpDrawer: helpDrawerReducer,
  tree: treeReducer,
  points: pointsReducer,
  tutorial: tutorialReducer
});

export default (state, action) => {
  var newState = initReducer(state, action);
  return combine(newState, action);
};
