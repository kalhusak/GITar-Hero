import BABYLON from 'babylonjs';
import Scene from './Scene';
import Repo3D from './Repo3D';
import Camera from './Camera';

const config = {
  antialiasing: true
};

class Engine3D extends BABYLON.Engine {
  constructor (canvas) {
    super(canvas, config.antialiasing);
    this.onNewValidCommand = ::this.onNewValidCommand;

    this.scene = new Scene(this);
    this.repo3D = new Repo3D(this.scene);
    this.camera = new Camera(this.repo3D.HEAD, canvas, this.scene);
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
