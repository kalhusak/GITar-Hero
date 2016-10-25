import BABYLON from 'babylonjs';
import config from './config';

class Scene extends BABYLON.Scene {
  constructor (engine) {
    super(engine);

    // TODO move camera to separate class
    const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), this);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(engine.getRenderingCanvas(), false);
    const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this);
    const sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, this);
    sphere.position.y = 1;
    const ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, this);
  }
}

export default Scene;
