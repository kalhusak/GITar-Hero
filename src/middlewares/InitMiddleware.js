import { autoOpenHelpDrawerTab } from '../actions/HelpDrawerActions';

export default ({ getState }) => (next) => (action) => {
  next(action);
  if (action.type === 'LOCATION_CHANGE') {
    next(autoOpenHelpDrawerTab('repo'));
  }
};
