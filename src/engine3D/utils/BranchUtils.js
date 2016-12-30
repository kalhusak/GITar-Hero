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

export default {
  getIntersectedBranchPoints
};
