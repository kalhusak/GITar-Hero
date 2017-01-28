import BABYLON from 'babylonjs';
import _ from 'lodash';
import Abstract3DObject from './Abstract3DObject';
import { outline as outlineStyle } from '../style';
import BranchUtils from '../utils/BranchUtils';

const config = {
  radius: 2,
  tessellation: 32,
  curveFactor: 20,
  subdivisions: 40,
  cap: BABYLON.Mesh.CAP_ALL,
  sideOrientation: BABYLON.Mesh.FRONTSIDE,
  enlogatingSpeed: 1,
  addOperation: 'ADD',
  removeOperation: 'REMOVE',
  maxHeight: 7.0,
  maxDelta: 11.0,
  enlogatingOperation: 'ENLOGATING',
  shortenOperation: 'SHORTEN'
};

export default class BranchConnector extends Abstract3DObject {
  constructor (name, startPosition, endPosition, endEvent, material, scene) {
    super(name, scene);
    this._createPath = ::this._createPath;
    this._createMesh = ::this._createMesh;
    this._animate = ::this._animate;
    this._getAnimationPath = ::this._getAnimationPath;
    this.disappear = ::this.disappear;

    this.startPosition = startPosition.clone();
    this.endPosition = endPosition.clone();
    this.path = this._createPath();
    this.mesh = this._createMesh(this.name, this.path, null);
    this.mesh.renderOutline = outlineStyle.enable;
    this.mesh.outlineColor = outlineStyle.color;
    this.mesh.outlineWidth = outlineStyle.width;
    this.mesh.material = material;

    this._animate(config.enlogatingOperation, endEvent);
  }

  disappear () {
    var endEvent = () => {
      this.mesh.dispose();
      this.mesh = null;
    }
    this._animate(config.shortenOperation, endEvent);
  }

  _animate (operation, endEvent) {
    // TODO make separate class for animation
    var index = 1;
    var elongating = () => {
      var newPath = this._getAnimationPath(index, operation);
      this.mesh = this._createMesh(null, newPath, this.mesh);
      index += config.enlogatingSpeed;
      if (index - 1 >= this.path.length) {
        this.scene.unregisterBeforeRender(elongating);
        if (endEvent) {
          endEvent();
        }
      }
    };

    this.scene.registerBeforeRender(elongating);
  }

  _getAnimationPath (index, operation) {
    var newPath = [];
    var endPath = [];
    if (operation === config.enlogatingOperation) {
      newPath = this.path.slice(0, index);
      endPath = _.fill(Array(this.path.length - index), _.last(newPath));
    } else if (operation === config.shortenOperation) {
      newPath = this.path.slice(0, this.path.length - index);
      endPath = this.path.length !== index ? _.fill(Array(index), _.last(newPath)) :
        _.fill(Array(index), _.first(this.path));
    }
    return newPath = _.concat(newPath, endPath);
  }

  _createPath () {
    var point1 = this.startPosition.clone();
    point1.z = this.endPosition.z;
    var point2 = this.startPosition.clone();
    point2.x = this.endPosition.x;

    var bezier = BABYLON.Curve3.CreateCubicBezier(this.startPosition, point1, point2,
      this.endPosition, config.subdivisions);
    var points = bezier.getPoints();

    var intersectedXs = [];
    if (this.startPosition.x > this.endPosition.x) {
      intersectedXs = BranchUtils.getIntersectedBranchPoints(this.endPosition.x, this.startPosition.x);
    } else {
      intersectedXs = BranchUtils.getIntersectedBranchPoints(this.startPosition.x, this.endPosition.x);
    }
    points.forEach((point) => {
      intersectedXs.forEach((intersectedX, index) => {
        var delta = point.x - intersectedX;
        if (Math.abs(delta) < config.maxDelta) {
          point.y += config.maxHeight * Math.cos(delta * ( (Math.PI/2) / config.maxDelta ));
        }
      });
    });

    return points;
  }

  _createMesh (name, path, instance) {
    var { radius, tessellation, cap, sideOrientation } = config;
    return BABYLON.Mesh.CreateTube(name, path, radius, tessellation, null, cap,
      this.scene, true, sideOrientation, instance);
  }
}
