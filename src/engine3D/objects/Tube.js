import BABYLON from 'babylonjs';
import _ from 'lodash';
import Abstract3DObject from './Abstract3DObject';
import { outline as outlineStyle } from '../style';

const config = {
  radius: 2,
  tessellation: 32,
  cap: BABYLON.Mesh.CAP_ALL,
  sideOrientation: BABYLON.Mesh.FRONTSIDE,
  enlogatingSpeed: 1,
  addOperation: 'ADD',
  removeOperation: 'REMOVE'
};

export default class Tube extends Abstract3DObject {
  constructor (name, position, partLength, parts, material, scene) {
    super(name, scene);
    this.getLastPointPosition = ::this.getLastPointPosition;
    this.getLastPointPositionRef = ::this.getLastPointPositionRef;
    this.getFirstPointPosition = ::this.getFirstPointPosition;
    this.getFirstPointPositionRef = ::this.getFirstPointPositionRef;
    this._animate = ::this._animate;
    this._createMesh = ::this._createMesh;

    this.partLength = partLength;
    this.parts = 0;
    this.path = [position.clone(), position.clone()];

    this.mesh = this._createMesh(this.name, this.path, null);
    this.mesh.alwaysSelectAsActiveMesh = true;
    this.mesh.renderOutline = outlineStyle.enable;
    this.mesh.outlineColor = outlineStyle.color;
    this.mesh.outlineWidth = outlineStyle.width;
    this.mesh.material = material;

    if (parts) {
      this.addParts(parts);
    }
  }

  addParts (parts, onEndEvent) {
    this.parts += parts;
    this._animate(config.addOperation, onEndEvent);
  }

  removeParts (parts, onEndEvent) {
    var delta = this.parts - parts;
    parts = delta < 0 ? 0 : parts;
    this.parts -= parts;
    this._animate(config.removeOperation, onEndEvent);
  }

  shorten (lastCommit, onEndEvent) {
    if (lastCommit) {
      var deltaZ = this.getLastPointPosition().z - lastCommit.getPosition().z;
      if (deltaZ > this.partLength) {
        this.parts -= (deltaZ/this.partLength) - 1;
      }
    } else {
      this.parts = 0;
    }
    this._animate(config.removeOperation, onEndEvent);
  }

  getLastPointPosition () {
    return this.getLastPointPositionRef().clone();
  }

  getLastPointPositionRef () {
    return _.last(this.path);
  }

  getFirstPointPosition () {
    return this.getFirstPointPositionRef().clone();
  }

  getFirstPointPositionRef () {
    return _.first(this.path);
  }

  _animate (operation, onEndEvent) {
    // TODO make separate class for animation
    var enlogating = () => {
      var first = this.getFirstPointPosition();
      var last = this.getLastPointPositionRef();
      var lastTargetPositionZ = first.z + (this.parts * this.partLength);
      var speedFactor = (lastTargetPositionZ - first.z) / this.partLength;
      var speed = speedFactor > 10 ? 2 * config.enlogatingSpeed : config.enlogatingSpeed;
      last.z += operation === config.addOperation ? speed : -speed;
      if (operation === config.addOperation ? last.z >= lastTargetPositionZ : last.z <= lastTargetPositionZ) {
        last.z = lastTargetPositionZ;
        this.scene.unregisterBeforeRender(enlogating);
        if (onEndEvent) {
          onEndEvent();
        }
      }
      this.mesh = this._createMesh(null, this.path, this.mesh);
    };

    this.scene.registerBeforeRender(enlogating);
  }

  _createMesh (name, path, instance) {
    var { radius, tessellation, cap, sideOrientation } = config;
    return BABYLON.Mesh.CreateTube(name, path, radius, tessellation, null, cap,
      this.scene, true, sideOrientation, instance);
  }
}
