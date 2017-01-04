import { createAction } from '../utils';

export const MODIFY_TREE = 'MODIFY_TREE';

export const modifyTree = changes => createAction(MODIFY_TREE, { changes });
