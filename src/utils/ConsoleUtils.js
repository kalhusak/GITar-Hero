import { identity, flattenDeep, find, remove } from 'lodash';

// Iterates over elements of collection, returning the element if it's the only one predicate returns truthy for
const searchForTheOnlyOne = (collection = [], predicate = identity) => {
  let match;

  collection.every(item => {
    if (predicate(item)) {
      if (match) {
        match = null;
        return false;
      }
      match = item;
    }
    return true;
  });

  return match;
};

export const treeToPathList = (tree, path = '') => {
  return flattenDeep(tree.map(node => {
    if (node.children) {
      return treeToPathList(node.children, `${node.name}/`);
    }
    return path + node.name;
  }));
};

export const searchForHint = (searchValue, { children }) => {
  if (children) {
    let match = searchForTheOnlyOne(children, node =>
      searchValue.startsWith(node.pattern) && node.pattern.length < searchValue.length);
    if (match) {
      return searchForHint(searchValue, match);
    }

    match = searchForTheOnlyOne(children, node => node.pattern.startsWith(searchValue));
    if (match) {
      return match.pattern;
    }
  }
};

const stringOverlapping = (str1, str2) => {
  if (str1 === str2) {
    return str1;
  }
  let i = 0;
  while (str1[i] === str2[i]) i++;
  return str1.slice(0, i);
};

const putStringValueIntoTree = (value, node, sliceFrom = 0) => {
  const sibling = find(node.children, ({ pattern }) => stringOverlapping(value, pattern).length >= sliceFrom + 2);
  if (sibling) {
    const overlapping = stringOverlapping(value, sibling.pattern);
    if (value.startsWith(sibling.pattern)) {
      putStringValueIntoTree(value, sibling, overlapping.length);
    } else {
      const groupNode = {
        pattern: overlapping,
        children: [sibling]
      };
      if (value !== overlapping) {
        groupNode.children.push({ pattern: value });
      }
      remove(node.children, sibling);
      node.children.push(groupNode);
    }
  } else {
    const newNode = { pattern: value };
    if (node.children) {
      node.children.push(newNode);
    } else {
      node.children = [newNode];
    }
  }
};

const generateTreeFromOverlappingStrings = (values) => {
  const tree = {
    pattern: '',
    children: []
  };
  values.forEach(value => putStringValueIntoTree(value, tree));
  return tree;
};

const generateTreeBuilder = (pattern) => {
  const tailRegExp = new RegExp(`${pattern}.*`);
  const replaceRecursively = (searchValue, optionsTree) => {
    const replaceTail = value => searchValue.replace(tailRegExp, value);
    const permuteOptions = (node = optionsTree) => {
      if (node.children) {
        return {
          pattern: replaceTail(node.pattern),
          children: node.children.map(node => permuteOptions(node))
        };
      }

      return replaceRecursively(searchValue.replace(pattern, node.pattern), optionsTree);
    };

    return searchValue.includes(pattern) ? permuteOptions() : { pattern: searchValue };
  };

  return replaceRecursively;
};

const permuteBranchNames = generateTreeBuilder(':branch:');
const permuteFileNames = generateTreeBuilder(':file:');

export const generateAutocompletionTree = (allowedCommands, branches = [], files = []) => {
  const branchesAutocompletionTree = generateTreeFromOverlappingStrings(branches);
  const filesAutocompletionTree = generateTreeFromOverlappingStrings(files);
  return {
    pattern: '',
    children: [
      {
        pattern: 'git ',
        children: allowedCommands
          .map(command => {
            if (command.includes(':file:')) {
              return permuteFileNames(`git ${command}`, filesAutocompletionTree);
            } else {
              return permuteBranchNames(`git ${command}`, branchesAutocompletionTree);
            }
          })
      },
      {
        pattern: 'help'
      }
    ]
  };
};
