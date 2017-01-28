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

export function getCenterPositionOfBranches () {
  var minX = 0.0, maxX = 0.0, minZ = 0.0, maxZ = 0.0;
  for (var branchName in branches) {
    var position = branches[branchName].getPosition();

    // X
    if (position.x > maxX) {
      maxX = position.x;
    } else if (position.x < minX) {
      minX = position.x;
    }

    // Z
    if (position.z > maxZ) {
      maxZ = position.z;
    } else if (position.z < minZ) {
      minZ = position.z;
    }
  }
  return {
    x: (maxX + minX) / 2,
    z: (maxZ + minZ) / 2
  };
}

export default {
  getIntersectedBranchPoints,
  getSecondBranchForMergeCommit,
  getCenterPositionOfBranches
};
