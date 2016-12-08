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

    this.scene = scene;
    this.object3D = null;
    this.cameraTarget = new CameraTarget('HeadCameraTarget', scene);
    this.isMoving = false;

    this.scene.registerBeforeRender(() => {
      this._moveCameraTargetToObjectIfNeed();
    });
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
    MoveUtils.moveTo(this.cameraTarget, this.object3D, config.cameraTargetSpeed, this.scene);
  }

  _isCameraNextToObject () {
    return this.cameraTarget.getPosition().equals(this.object3D.getPosition());
  }
}
