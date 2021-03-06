import BABYLON from 'babylonjs';
import Scene from './Scene';
import Repo3D from './Repo3D';
import Camera from './Camera';
import Ground from './objects/Ground';
import VignettePostProcess from './postProcesses/VignettePostProcess';

const config = {
  antialiasing: true
};

class Engine3D extends BABYLON.Engine {
  constructor (canvas) {
    super(canvas, false);
    this.onNewValidCommand = ::this.onNewValidCommand;
    this.onNewInvalidCommand = ::this.onNewInvalidCommand;
    this.renderLoop = ::this.renderLoop;
    this.scene = new Scene(this);
    this.repo3D = new Repo3D(this.scene);
    this.camera = new Camera(this.repo3D.HEAD, canvas, this.scene);
    this.ground = new Ground(this.camera, this.scene);
    this.vignette = new VignettePostProcess(this);
    if (config.antialiasing) {
      this.fxaaAntialiasing = new BABYLON.FxaaPostProcess('fxaa', 1.0, this.camera, null, this, true);
    }
    this.renderLoop();
  }

  renderLoop () {
    this.runRenderLoop(() => {
      let currentTime = new Date().getTime();
      this.scene.elapsedTime = currentTime - this.scene.lastTime;
      // document.getElementById('fps').innerHTML = engine.getFps().toFixed();
      this.scene.render();
      this.scene.lastTime = currentTime;
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
