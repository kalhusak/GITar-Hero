export default class Abstract3DObject {

  constructor (name, scene) {
    this.getPosition = ::this.getPosition;
    this.getPositionRef = ::this.getPositionRef;
    this.setPosition = ::this.setPosition;
    this.getType = ::this.getType;

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

  getType () {
    console.log('WARNING - undefined type of object: ' + this.name);
    return 'UNDEFINED_TYPE';
  }
}
