import BABYLON from 'babylonjs'
import MoveUtils from './utils/MoveUtils';
import CameraTarget from './objects/CameraTarget';

const config = {
  cameraTargetSpeed: 1.5
};

export default class FollowObject {
  constructor (scene) {
    this._moveCameraTargetToObjectIfNeed = ::this._moveCameraTargetToObjectIfNeed;
    this._moveCameraTargetToObject = ::this._moveCameraTargetToObject;
    this._isCameraNextToObject = ::this._isCameraNextToObject;
    this.addZOffset = ::this.addZOffset;

    this.scene = scene;
    this.object3D = null;
    this.cameraTarget = new CameraTarget('HeadCameraTarget', scene);
    this.isMoving = false;
    this.offset = BABYLON.Vector3.Zero();

    this.scene.registerBeforeRender(() => {
      this._moveCameraTargetToObjectIfNeed();
    });
  }

  addZOffset (value) {
    this.offset.z += value;
  }

  _moveCameraTargetToObjectIfNeed () {
    if (this.object3D !== null && !this._isCameraNextToObject()) {
      if (!this.isMoving) {
        this._moveCameraTargetToObject();
        this.isMoving = true;
      }
    } else {
      this.isMoving = false;
    }
  }

  _moveCameraTargetToObject () {
    MoveUtils.moveTo(this.cameraTarget, this.object3D, config.cameraTargetSpeed, this.scene, this.offset);
  }

  _isCameraNextToObject () {
    var cameraTargetPosition = this.cameraTarget.getPosition().add(this.offset);
    return cameraTargetPosition.equals(this.object3D.getPosition());
  }
}
