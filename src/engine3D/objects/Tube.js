import BABYLON from 'babylonjs';
import _ from 'lodash';
import Abstract3DObject from './Abstract3DObject';

const config = {
  radius: 2,
  tessellation: 16,
  cap: BABYLON.Mesh.CAP_ALL,
  sideOrientation: BABYLON.Mesh.FRONTSIDE,
  enlogatingSpeed: 1,
  addOperation: 'ADD',
  removeOperation: 'REMOVE'
};

export default class Tube extends Abstract3DObject {
  constructor (name, position, partLength, scene, parts) {
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

    if (parts) {
      this.addParts(parts);
    }
    // TODO remove wireframe mat
    // var mat = new BABYLON.StandardMaterial('branchMat', scene);
    // mat.wireframe = true;
    // this.mesh.material = mat;
  }

  addParts (parts) {
    this.parts += parts;
    this._animate(config.addOperation);
  }

  removeParts (parts) {
    var delta = this.parts - parts;
    parts = delta < 0 ? 0 : parts;
    this.parts -= parts;
    this._animate(config.removeOperation);
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

  _animate (operation) {
    // TODO make separate class for animation
    var enlogating = () => {
      var first = this.getFirstPointPosition();
      var last = this.getLastPointPositionRef();
      last.z += operation === config.addOperation ? config.enlogatingSpeed : -config.enlogatingSpeed;
      var lastTargetPositionZ = first.z + (this.parts * this.partLength);
      if (operation === config.addOperation ? last.z >= lastTargetPositionZ : last.z <= lastTargetPositionZ) {
        last.z = lastTargetPositionZ;
        this.scene.unregisterBeforeRender(enlogating);
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
