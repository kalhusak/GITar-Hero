import BABYLON from 'babylonjs';

const config = {
  name: 'followCamera',
  initPosition: new BABYLON.Vector3(0, 0, -100),
  radius: 80,
  rotationOffset: 180,
  heightOffset: 30,
  heightOffsetSpeed: 10,
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
    var factor = 0.0;
    if (event.deltaY >= 0 && this.heightOffset < 500) {
      factor = 1;
    } else if (event.deltaY < 0 && this.heightOffset - 10 >= config.heightOffset) {
      factor = -1;
    }

    this.heightOffset += config.heightOffsetSpeed * factor;
    this.maxCameraSpeed += 5 * factor;
    this.followObject.addOffsetInPlace(new BABYLON.Vector3(0, 0, -3 * factor));
  }
}

export default Camera;
