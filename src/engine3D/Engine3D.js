import BABYLON from 'babylonjs';
import Scene from './Scene';
import Repo3D from './Repo3D';
import Camera from './Camera';
import Ground from './objects/Ground';

const config = {
  antialiasing: true
};

class Engine3D extends BABYLON.Engine {
  constructor (canvas) {
    super(canvas, config.antialiasing);
    this.onNewValidCommand = ::this.onNewValidCommand;
    this.onNewInvalidCommand = ::this.onNewInvalidCommand;
    this.renderLoop = ::this.renderLoop;
    this.scene = new Scene(this);
    this.repo3D = new Repo3D(this.scene);
    this.camera = new Camera(this.repo3D.HEAD, canvas, this.scene);
    this.ground = new Ground(this.camera, this.scene);
    this.renderLoop();
  }

  renderLoop () {
    let scene = this.scene;
    let engine = this;
    this.runRenderLoop(function () {
      var currentTime = new Date().getTime();
      scene.elapsedTime = currentTime - scene.lastTime;
      document.getElementById('fps').innerHTML = engine.getFps().toFixed();
      scene.render();
      scene.lastTime = currentTime;
    });
  }

  onNewValidCommand (type, data) {
    this.repo3D.onNewValidCommand(type, data);
  }

  onNewInvalidCommand () {
    this.camera.shake();
  }
}

export default Engine3D;
