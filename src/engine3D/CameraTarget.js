import BABYLON from 'babylonjs';
import Abstract3DObject from './Abstract3DObject';

const config = {
  isVisible: true,
  initPosition: new BABYLON.Vector3(0, 0, 0)
};

export default class CameraTarget extends Abstract3DObject {

  constructor (name, scene) {
    super(name, scene);
    this._isInFrustum = ::this._isInFrustum;

    this.mesh = BABYLON.Mesh.CreateSphere(name, 1, 1, scene);
    this.mesh.position = config.initPosition;
    this.mesh.isInFrustum = this._isInFrustum;
    this.isVisible = config.isVisible;
    this.mesh.material = new BABYLON.StandardMaterial('CameraTargetMaterial', scene);
    this.mesh.material.diffuseColor = new BABYLON.Color3.Red();
  }

  _isInFrustum (planes) {
    return this.isVisible;
  }
}
