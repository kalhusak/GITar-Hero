import BABYLON from 'babylonjs';
import _ from 'lodash';
import PathUtils from './utils/PathUtils';
import Abstract3DObject from './Abstract3DObject';
const tubeConfig = {
  radius: 2,
  tessellation: 16,
  cap: BABYLON.Mesh.CAP_ALL,
  sideOrientation: BABYLON.Mesh.FRONTSIDE
};

const pathConfig = {
  curveFactor: 20,
  subdivisions: 40,
  initPosition: new BABYLON.Vector3(0, 0, 0),
  partLength: 30,
  enlogatingSpeed: 1,
  curvingSpeed: 1,
  branchDistance: 30
};

export default class Branch extends Abstract3DObject {
  constructor (name, parentCommit, scene) {
    super(name, scene);

    this.addCommit = ::this.addCommit;
    this._createTube = ::this._createTube;
    this._createPath = ::this._createPath;
    this._addParts = ::this._addParts;
    this._animateCurve = ::this._animateCurve;

    this.parentCommit = parentCommit;
    this.path = this._createPath(parentCommit);
    this.mesh = this._createTube(this.name, this.path, null);
    this.mesh.alwaysSelectAsActiveMesh = true;

    this.cameraTarget.position = _.last(this.path);
    this.commits = [];
    this.activeCommit = null;
    this.enlogatingDelta = 0;

    if (!parentCommit) {
      this._addParts(1);
    } else {
      this._animateCurve();
    }
  }

  addCommit (commit) {
    var point = _.last(this.path);
    commit.setPosition(_.cloneDeep(point));
    commit.cameraTarget.position = _.cloneDeep(point);
    this.commits.push(commit);
    this._addParts(1);
  }

  _animateCurve () {
    var index = 1;
    this.cameraTarget.position = _.cloneDeep(_.first(this.path));
    this.cameraTarget.position.z += pathConfig.partLength;
    var curve = () => {
      var newPath = this.path.slice(0, index);
      var pathEnd = _.fill(Array(this.path.length - index), _.last(newPath));
      newPath = _.concat(newPath, pathEnd);
      this.mesh = this._createTube(null, newPath, this.mesh);
      index += pathConfig.curvingSpeed;
      this.cameraTarget.position.x = _.cloneDeep(_.last(newPath)).x;
      if (index - 1 >= this.path.length) {
        this.scene.unregisterBeforeRender(curve);
      }
    };

    this.scene.registerBeforeRender(curve);
  }

  _addParts (partCount) {
    var enlogating = () => {
      var lastPathPoint = _.last(this.path);
      lastPathPoint.z += pathConfig.enlogatingSpeed;
      this.enlogatingDelta += pathConfig.enlogatingSpeed;
      this.mesh = this._createTube(null, this.path, this.mesh);
      this.cameraTarget.position = _.cloneDeep(lastPathPoint);
      if (this.enlogatingDelta >= partCount * pathConfig.partLength) {
        this.enlogatingDelta = 0;
        this.scene.unregisterBeforeRender(enlogating);
      }
    };

    this.scene.registerBeforeRender(enlogating);
  }

  _createTube (name, path, instance) {
    var { radius, tessellation, cap, sideOrientation } = tubeConfig;
    return BABYLON.Mesh.CreateTube(name, path, radius, tessellation, null, cap, this.scene, true, sideOrientation, instance);
  }

  _createPath (parentCommit) {
    if (parentCommit) {
      const { x, y, z } = parentCommit.getPosition();
      const { partLength, branchDistance } = pathConfig;
      var startPosition = new BABYLON.Vector3(x, y, z);
      var destinationPosition = new BABYLON.Vector3(x + branchDistance, y, z + partLength);
      return PathUtils.createCurvedPath(startPosition, destinationPosition, pathConfig);
    } else {
      return PathUtils.createStraightPath(pathConfig.initPosition, _.cloneDeep(pathConfig.initPosition));
    }
  }
}
