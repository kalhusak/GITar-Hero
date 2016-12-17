import BABYLON from 'babylonjs';

export default class Scene extends BABYLON.Scene {
  constructor (engine) {
    super(engine);
    // TODO make light management object
    const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(3, 1, -3), this);
  }
}
