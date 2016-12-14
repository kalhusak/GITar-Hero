import BABYLON from 'babylonjs';

export default class Scene extends BABYLON.Scene {
  constructor (engine) {
    super(engine);

    // TODO make light management object
    const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(5, 1, 0), this);
    this.elapsedTime = 0;
    this.lastTime = new Date().getTime();
  }
}
