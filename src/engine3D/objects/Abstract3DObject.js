export default class Abstract3DObject {

  constructor (name, scene) {
    this.getPosition = ::this.getPosition;
    this.getPositionRef = ::this.getPositionRef;
    this.setPosition = ::this.setPosition;

    this.name = name;
    this.scene = scene;
  }

  getPosition () {
    return this.getPositionRef().clone();
  }

  getPositionRef () {
    return this.mesh.position;
  }

  setPosition (position) {
    this.mesh.position.x = position.x;
    this.mesh.position.y = position.y;
    this.mesh.position.z = position.z;
  }

  setPositionRef (position) {
    this.mesh.position = position;
  }
}
