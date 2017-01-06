import { first, find, remove } from 'lodash';

function pushNode (subtree, path, status) {
  const name = first(path);
  let node = find(subtree, { name });

  if (path.length === 1) {
    if (node) {
      node.status = status;
    } else {
      subtree.push({ name, status });
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

export function removeFile (subtree, path) {
  removeNode(subtree, path.split('/'));
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

export function stageAll (subtree) {
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
