export function findByNameInBranches (name, branches) {
  for (var branchName in branches) {
    var commit = branches[branchName].getCommit(name);
    if (commit) {
      return commit;
    }
  }
  return null;
}

export function getBranchForCommit (commit, branches) {
  for (var branchName in branches) {
    var branch = branches[branchName];
    if (branch.getCommit(commit.name)) {
      return branch;
    }
  }
  return null;
}

export default {
  findByNameInBranches,
  getBranchForCommit
};
