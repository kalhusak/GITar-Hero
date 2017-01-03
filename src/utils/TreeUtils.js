import { first, find } from 'lodash';

export function pushNode (subtree, path, status) {
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

export function addPath (subtree, target) {
  pushNode(subtree, target.split('/'), 'staged');
}

export function addAll (subtree) {
  subtree.forEach(node => {
    if (node.children) {
      addAll(node.children);
    } else {
      node.status = 'staged';
    }
  });
}
