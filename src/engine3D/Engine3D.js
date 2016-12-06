import BABYLON from 'babylonjs';
import config from './config';
import Scene from './Scene';
import Repo3D from './Repo3D';
import Camera from './Camera';

class Engine3D extends BABYLON.Engine {
  constructor (canvas) {
    super(canvas, config.ANTIALIASING);
    this.scene = new Scene(this);
    this.onNewValidCommand = ::this.onNewValidCommand;

    this.camera = new Camera(canvas, this.scene);
    this.repo3D = new Repo3D(this.camera, this.scene);
    this.renderLoop();
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
