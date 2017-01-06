import { cloneDeep, first } from 'lodash';
import * as treeActions from '../actions/TreeActions';
import * as commandActions from '../actions/CommandActions';
import * as TreeUtils from '../utils/TreeUtils';

const initialState = [];

export default function treeReducer (state = initialState, { type, payload }) {
  let newState;

  switch (type) {
    case commandActions.NEW_VALID_COMMAND:
      switch (payload.step.type) {
        case 'ADD':
          newState = cloneDeep(state);
          const [, target] = first(payload.step.commands).match(/^git add ([a-zA-Z.-]*)/);

          if (['-A', '.'].includes(target)) {
            TreeUtils.stageAll(newState);
          } else {
            TreeUtils.stageFile(newState, target);
          }

          return newState;

        case 'COMMIT':
          newState = cloneDeep(state);

          TreeUtils.commit(newState);
          return newState;

        default:
          return state;
      }

    case treeActions.MODIFY_TREE:
      newState = cloneDeep(state);
      const { newFiles, modifyFiles, removeFiles, unstagedRemoveFiles } = payload.changes;

      (newFiles || [])
        .forEach(path => TreeUtils.addFile(newState, path));

      (modifyFiles || [])
        .forEach(path => TreeUtils.modifyFile(newState, path));

      (removeFiles || [])
        .forEach(path => TreeUtils.removeFile(newState, path));

      (unstagedRemoveFiles || [])
        .forEach(path => TreeUtils.unstagedRemoveFile(newState, path));

      return newState;

    default:
      return state;
  }
}
