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
    this.mesh.position = position;
  }
}
