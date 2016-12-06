import BABYLON from 'babylonjs';

class Abstract3DObject {

  constructor (name, scene) {
    this.getPosition = ::this.getPosition;
    this.setPosition = ::this.setPosition;

    this.name = name;
    this.scene = scene;
    this.cameraTarget = BABYLON.Mesh.CreateSphere(name + 'CameraTarget', 1, 1, scene);
    this.cameraTarget.isInFrustum = (planes) => {
      return false;
    };
  }

  getPosition () {
    return this.mesh.position;
  }

  setPosition (position) {
    this.mesh.position = position;
  }

}

export default Abstract3DObject;
