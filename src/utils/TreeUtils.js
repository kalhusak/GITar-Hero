import { first, find, remove } from 'lodash';

function pushNode (subtree, path, status) {
  const name = first(path);
  let node = find(subtree, { name });

  if (path.length === 1) {
    if (node) {
      if (status === 'removed') {
        remove(subtree, node);
      } else {
        node.status = status;
      }
    } else {
      if (status !== 'removed') {
        subtree.push({ name, status });
      }
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

export function addFile (subtree, path) {
  pushNode(subtree, path.split('/'), 'unmodified');
}

export function removeFile (subtree, path) {
  pushNode(subtree, path.split('/'), 'removed');
}

export function modifyFile (subtree, path) {
  pushNode(subtree, path.split('/'), 'unstaged');
}

function forAllFiles (subtree, callback) {
  subtree.forEach(node => {
    if (node.children) {
      forAllFiles(node.children, callback);
    } else {
      callback(node);
    }
  });
}

export function addAll (subtree) {
  forAllFiles(subtree, node => {
    if (node.status === 'unstaged') {
      node.status = 'staged';
    }
  });
}

export function commit (subtree) {
  forAllFiles(subtree, node => {
    if (node.status === 'staged') {
      node.status = 'unmodified';
    }
  });
}
