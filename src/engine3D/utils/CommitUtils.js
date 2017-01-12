import { find } from 'lodash';

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

export function getAllBeforeCommonParent (commits, commonParentName) {
  var commitsBefore = [];
  for (var i = commits.length - 1; i >= 0; i--) {
      var commit = commits[i];
      if (commit.name === commonParentName) {
        break;
      }
      commitsBefore.push(commit);
  }
  return commitsBefore;
}

export default {
  findByNameInBranches,
  getBranchForCommit,
  getAllBeforeCommonParent
};
