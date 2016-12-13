import BABYLON from 'babylonjs'
import MoveUtils from './utils/MoveUtils';
import CameraTarget from './objects/CameraTarget';
import Particles from './Particles';

const config = {
  cameraTargetSpeed: 1.5
};

export default class FollowObject {
  constructor (scene) {
    this._moveCameraTargetToObjectIfNeed = ::this._moveCameraTargetToObjectIfNeed;
    this._moveCameraTargetToObject = ::this._moveCameraTargetToObject;
    this._isCameraNextToObject = ::this._isCameraNextToObject;
    this.addOffsetInPlace = ::this.addOffsetInPlace;
    this._initParticles = ::this._initParticles;

    this.scene = scene;
    this.object3D = null;
    this.cameraTarget = new CameraTarget('HeadCameraTarget', scene);
    this.isMoving = false;
    this.offset = BABYLON.Vector3.Zero();

    this.particles = null;
    this._initParticles();

    this.scene.registerBeforeRender(() => {
      this._moveCameraTargetToObjectIfNeed();
    });
  }

  addOffsetInPlace (offset) {
    this.offset.addInPlace(offset);
  }

  _moveCameraTargetToObjectIfNeed () {
    if (this.object3D !== null && !this._isCameraNextToObject() && !this.isMoving) {
      this._moveCameraTargetToObject();
      this.isMoving = true;
    }
  }

  _moveCameraTargetToObject () {
    var endEvent = () => {
      this.isMoving = false;
    }
    MoveUtils.moveTo(this.cameraTarget, this.object3D, config.cameraTargetSpeed, this.scene, this.offset, endEvent);
  }

  _isCameraNextToObject () {
    var targetPosition = this.object3D.getPosition().add(this.offset);
    return this.cameraTarget.getPosition().equals(targetPosition);
  }

  _initParticles () {
    let targetParticles = new Particles('target', this.cameraTarget.mesh, this.scene);
    targetParticles.setEmitParams(500, 2, 5, 0.01);
    targetParticles.setLifeTimes(0.2, 0.6);
    targetParticles.setDirections(new BABYLON.Vector3(3, 3, 3), new BABYLON.Vector3(-3, -3, -3));
    targetParticles.setSizes(0.5,2);
    targetParticles.stop();

    this.particles = targetParticles;
  }
}
