import BABYLON from 'babylonjs';
import FollowCamera from './FollowCamera';

const config = {
  name: 'followCamera',
  initPosition: new BABYLON.Vector3(0, 0, -100),
  radius: 80,
  rotationOffset: 180,
  heightOffset: 30,
  acceleration: 0.005,
  maxCameraSpeed: 5
};

class Camera extends FollowCamera {

  constructor (canvas, scene) {
    super(config.name, config.initPosition, scene);

    this.scene = scene;
    this.scene.activeCamera = this;
    this.radius = config.radius;
    this.rotationOffset = config.rotationOffset;
    this.heightOffset = config.heightOffset;
    this.cameraAcceleration = config.acceleration;
    this.maxCameraSpeed = config.maxCameraSpeed;
    this.attachControl(canvas, true);
  }
}

export default Camera;
