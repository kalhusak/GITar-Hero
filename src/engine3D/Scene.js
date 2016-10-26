import BABYLON from 'babylonjs';
import config from './config';

class Scene extends BABYLON.Scene {
  constructor (engine) {
    super(engine);

    // TODO move camera to separate class
    const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), this);
    camera.setTarget(BABYLON.Vector3.Zero());
    const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this);
    const commit = BABYLON.Mesh.CreateSphere('commit', 16, 3, this);
    const line = BABYLON.Mesh.CreateCylinder('line', 16, 1, 1, 40, 40, this);
    line.rotation.x = Math.PI / 2;
    const loop = () => {
      requestAnimationFrame(loop);
      commit.position.z -= 0.1;
    };
    loop();
  }
}

export default Scene;
