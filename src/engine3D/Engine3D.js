import BABYLON from 'babylonjs';
import config from './config';
import Scene from './Scene';
import Repo3D from './Repo3D';

class Engine3D extends BABYLON.Engine {
  constructor (canvas) {
    super(canvas, config.ANTIALIASING);
    this.scene = new Scene(this);
    this.onNewValidCommand = ::this.onNewValidCommand;

    var freeCamera = new BABYLON.FreeCamera('FreeCamer', new BABYLON.Vector3(0, 10, -40), this.scene);
    freeCamera.attachControl(canvas, true);
    this.scene.activeCamera = freeCamera;
    this.renderLoop();

    this.repo3D = new Repo3D(this.scene);
  }

  renderLoop () {
    let scene = this.scene;
    this.runRenderLoop(function () {
      scene.render();
    });
  }

  onNewValidCommand (type, data) {
    this.repo3D.onNewValidCommand(type, data);
  }
}

export default Engine3D;
