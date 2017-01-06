import { first, find, remove } from 'lodash';

function pushNode (subtree, path, status, changeType) {
  const name = first(path);
  let node = find(subtree, { name });

  if (path.length === 1) {
    if (node) {
      node.status = status;

      if (changeType) {
        node.changeType = changeType;
      }
    } else {
      subtree.push({ name, status, changeType: 'added' });
    }
  } else {
    if (!node) {
      node = {
        name,
        children: []
      };
      subtree.push(node);
    }

    pushNode(node.children, path.slice(1), status);
  }
};

function removeNode (subtree, path) {
  const name = first(path);
  let node = find(subtree, { name });

  if (node) {
    if (path.length === 1) {
      remove(subtree, node);
    } else {
      if (node.children) {
        removeNode(node.children, path.slice(1));
        if (node.children.length === 0) {
          remove(subtree, node);
        }
      }
    }
  }
}

export function addFile (subtree, path) {
  pushNode(subtree, path.split('/'), 'unmodified');
}

export function stageFile (subtree, path) {
  pushNode(subtree, path.split('/'), 'staged');
}

export function unstagedRemoveFile (subtree, path) {
  pushNode(subtree, path.split('/'), 'unstaged', 'removed');
}

export function removeFile (subtree, path) {
  removeNode(subtree, path.split('/'));
}

export function modifyFile (subtree, path) {
  pushNode(subtree, path.split('/'), 'unstaged');
}

function forAllFiles (subtree, callback, path = []) {
  subtree.forEach(node => {
    if (node.children) {
      forAllFiles(node.children, callback, path.concat(node.name));
    } else {
      callback(node, path.concat(node.name));
    }
  });
}

export function stageAll (subtree) {
  forAllFiles(subtree, node => {
    if (node.status === 'unstaged') {
      node.status = 'staged';
    }
  });
}

export function commit (subtree) {
  const nodesToRemove = [];

  forAllFiles(subtree, (node, path) => {
    if (node.status === 'staged') {
      if (node.changeType === 'removed') {
        nodesToRemove.push(path);
      } else {
        node.status = 'unmodified';
      }
    }
  });

  nodesToRemove.forEach(path => removeNode(subtree, path));
}
