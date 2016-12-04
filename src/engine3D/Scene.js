import BABYLON from 'babylonjs';
import config from './config';
import Branch from './Branch';
import Commit from './Commit';

let index = 0;

class Scene extends BABYLON.Scene {
  constructor (engine) {
    super(engine);

    // TODO move camera to separate class

    const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this);
  }
}

export default Scene;
