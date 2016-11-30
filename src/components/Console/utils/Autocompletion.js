const branchAutocompleteTree = {
  pattern: '',
  children: [
    {pattern: 'develop'},
    {pattern: 'master'},
    {
      pattern: 'feature/',
      children: [
        {pattern: 'feature/task1'},
        {pattern: 'feature/chuj2'}
      ]
    }
  ]
};

const generateTreeBuilder = (pattern, optionsTree) => {
  const tailRegExp = new RegExp(`${pattern}.*`);
  const replaceRecursively = searchValue => {
    const replaceTail = value => searchValue.replace(tailRegExp, value);
    const permuteOptions = (node = optionsTree) => {
      if (node.children) {
        return {
          pattern: replaceTail(node.pattern),
          children: node.children.map(node => permuteOptions(node))
        };
      }

      return replaceRecursively(searchValue.replace(pattern, node.pattern));
    };

    return searchValue.includes(pattern) ? permuteOptions() : { pattern: searchValue };
  };

  return replaceRecursively;
};

const permuteBranchNames = generateTreeBuilder(':branch:', branchAutocompleteTree);

export const generateAutocompletionTree = (allowedCommands, branches) => {
  return {
    pattern: '',
    children: [
      {
        pattern: 'git ',
        children: allowedCommands.map(command => permuteBranchNames(`git ${command}`))
      }
    ]
  };
};
