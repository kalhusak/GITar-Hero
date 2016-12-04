import BABYLON from 'babylonjs';
import _ from 'lodash';

export function createCurvedPath (startPosition, destinationPosition, pathConfig) {
  const { x, y, z } = startPosition;
  const { subdivisions, partLength } = pathConfig;
  var toRight = startPosition.x < destinationPosition.x;
  var point1 = new BABYLON.Vector3(x, y, z + partLength);
  var point2 = new BABYLON.Vector3(x + (toRight ? partLength : -partLength), y, z);
  var bezier = BABYLON.Curve3.CreateCubicBezier(startPosition, point1, point2, destinationPosition, subdivisions);
  var points = bezier.getPoints();
  points.push(_.cloneDeep(_.last(points)));
  return points;
}

export function createStraightPath (startPosition, destinationPosition) {
  return [startPosition, destinationPosition];
}

export default {
  createCurvedPath,
  createStraightPath
};
