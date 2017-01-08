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
    this.getPosition = ::this.getPosition;
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
    var factor = event.deltaY >= 0 ? 1 : -1;
    var newHeightOffset = this.heightOffset + config.heightOffsetSpeed * factor;
    if (newHeightOffset >= config.heightOffset && newHeightOffset <= 300 && this.followObject.offset.equals(BABYLON.Vector3.Zero())) {
      this.heightOffset = newHeightOffset;
      this.maxCameraSpeed += 5 * factor;
      this.cameraAcceleration += 0.01 * factor;
      if ( this.followObject.cameraTargetSpeed === 3.0)
        this.followObject.cameraTargetSpeed = 1.5;
    } else if (newHeightOffset >= config.heightOffset && (this.position.z > -100 || factor < 0)) {
      this.followObject.addOffsetInPlace(new BABYLON.Vector3(0, 0, -10 * factor));
      this.followObject.cameraTargetSpeed = 3.0;
    }
  }

  getPosition () {
    return this.position.clone();
  }
}

export default Camera;
