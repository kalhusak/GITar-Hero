export function findByNameInBranches (name, branches) {
  for (var branchName in branches) {
    var commit = branches[branchName].getCommit(name);
    if (commit) {
      return commit;
    }
  }
  return null;
}

export default {
  findByNameInBranches
};
