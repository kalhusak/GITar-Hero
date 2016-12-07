import BABYLON from 'babylonjs';

class FollowCamera extends BABYLON.TargetCamera {

  constructor (name, position, scene, lockedTarget) {
    super(name, position, scene);
    this.getRadians = ::this.getRadians;
    this.follow = ::this.follow;
    this._checkInputs = ::this._checkInputs;
    this.getTypeName = ::this.getTypeName;
    this.radius = 12;
    this.rotationOffset = 0;
    this.heightOffset = 4;
    this.cameraAcceleration = 0.05;
    this.maxCameraSpeed = 20;
    this.lockedTarget = lockedTarget;
  }

  getRadians (degrees) {
    return degrees * Math.PI / 180;
  }

  follow (cameraTarget) {
    if (!cameraTarget) {
      return;
    }

    var yRotation = 0;
    if (cameraTarget.rotationQuaternion) {
      // var rotMatrix = new BABYLON.Matrix();
      // cameraTarget.rotationQuaternion.toRotationMatrix(rotMatrix);
      // yRotation = Math.atan2(rotMatrix.m[8], rotMatrix.m[10]);
    } else {
      // yRotation = cameraTarget.rotation.y;
    }

    var radians = this.getRadians(this.rotationOffset) + yRotation;
    var targetX = cameraTarget.position.x + Math.sin(radians) * this.radius;

    var targetZ = cameraTarget.position.z + Math.cos(radians) * this.radius;
    var dx = targetX - this.position.x;
    var dy = (cameraTarget.position.y + this.heightOffset) - this.position.y;
    var dz = (targetZ) - this.position.z;
    var vx = dx * this.cameraAcceleration * 2; // this is set to .05
    var vy = dy * this.cameraAcceleration;
    var vz = dz * this.cameraAcceleration * 2;

    if (vx > this.maxCameraSpeed || vx < -this.maxCameraSpeed) {
      vx = vx < 1 ? -this.maxCameraSpeed : this.maxCameraSpeed;
    }

    if (vy > this.maxCameraSpeed || vy < -this.maxCameraSpeed) {
      vy = vy < 1 ? -this.maxCameraSpeed : this.maxCameraSpeed;
    }

    if (vz > this.maxCameraSpeed || vz < -this.maxCameraSpeed) {
      vz = vz < 1 ? -this.maxCameraSpeed : this.maxCameraSpeed;
    }

    this.position = new BABYLON.Vector3(this.position.x + vx, this.position.y + vy, this.position.z + vz);
    // this.setTarget(cameraTarget.position);
  }

  _checkInputs () {
    super._checkInputs();
    this.follow(this.lockedTarget);
  }

  getTypeName () {
    return 'FollowCamera';
  }
}

export default FollowCamera;
