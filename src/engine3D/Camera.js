import BABYLON from 'babylonjs';
import BranchUtils from './utils/BranchUtils'

const config = {
  name: 'followCamera',
  initPosition: new BABYLON.Vector3(0, 0, -100),
  radius: 80,
  rotationOffset: 180,
  heightOffset: 30,
  acceleration: 0.01,
  maxCameraSpeed: 5
};

class Camera extends BABYLON.FollowCamera {

  constructor (followObject, canvas, scene) {
    super(config.name, config.initPosition, scene);
    this.onWheel = ::this.onWheel;

    this.scene = scene;
    this.scene.activeCamera = this;

    this.followObject = followObject;
    this.lockedTarget = followObject.cameraTarget.mesh;
    this.radius = config.radius;
    this.rotationOffset = config.rotationOffset;
    this.heightOffset = config.heightOffset;
    this.cameraAcceleration = config.acceleration;
    this.maxCameraSpeed = config.maxCameraSpeed;
    this.attachControl(canvas, true);

    window.addEventListener('wheel', this.onWheel);
  }

  onWheel (event) {
    var center = BranchUtils.getCenterPositionOfBranches();
    if (event.deltaY > 0) {
      this.heightOffset += 8;
      this.maxCameraSpeed += 2;
      this.followObject.addZOffset(3);
    } else if (this.heightOffset - 8 >= config.heightOffset) {
      this.heightOffset -= 8;
      this.maxCameraSpeed -= 2;
      this.followObject.addZOffset(-3);
    }
  }
}

export default Camera;
