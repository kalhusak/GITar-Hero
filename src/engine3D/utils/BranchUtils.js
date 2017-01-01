import { branches } from '../Repo3D';

export function getIntersectedBranchPoints (fromX, toX) {
  var intersectedX = [];
  for (var branchName in branches) {
    var branch = branches[branchName];
    var x = branch.getPosition().x;
    if (!branch.endConnector && x > fromX && x < toX) {
      intersectedX.push(x);
    }
  }
  return intersectedX;
}

export function getSecondBranchForMergeCommit (mergeCommit, firstBranch) {
  for (var branchName in branches) {
    var branch = branches[branchName];
    if (branch !== firstBranch) {
      var commit = branch.getCommit(mergeCommit.name);
      if (commit === mergeCommit) {
        return branch;
      }
    }
  }
  return null;
}

export default {
  getIntersectedBranchPoints,
  getSecondBranchForMergeCommit
};
