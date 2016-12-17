import BABYLON from 'babylonjs';
import Scene from './Scene';
import Repo3D from './Repo3D';
import Camera from './Camera';
import SobelPostProcess from './SobelPostProcess';
import TextureForSobelFilter from './renderTextures/TextureForSobelFilter';

const config = {
  antialiasing: true
};

class Engine3D extends BABYLON.Engine {
  constructor (canvas) {
    super(canvas, false);
    this.onNewValidCommand = ::this.onNewValidCommand;
    this.renderLoop = ::this.renderLoop;
    this._renderPipeline = ::this._renderPipeline;
    this.scene = new Scene(this);
    this.repo3D = new Repo3D(this.scene);
    this.camera = new Camera(this.repo3D.HEAD, canvas, this.scene);
    this._renderPipeline();
    this.renderLoop();
  }

  renderLoop () {
    let scene = this.scene;
    let engine = this;
    var counter = 0;
    this.runRenderLoop(function () {
      var currentTime = new Date().getTime();
      scene.elapsedTime = currentTime - scene.lastTime;
      if (((++counter) % 30) === 0) {
        document.getElementById('fps').innerHTML = Math.round(engine.fps);
        counter = 0;
      }
      scene.render();
      scene.lastTime = currentTime;
    });
  }

  _renderPipeline () {
    this.textureForSobel = new TextureForSobelFilter(this.scene);
    this.sobelPostProcess = new SobelPostProcess(this, this.textureForSobel);
    if (config.antialiasing) {
      this.fxaaAntialiasing = new BABYLON.FxaaPostProcess('fxaa', 1.0, this.camera, null, this, true);
    }
  }

  onNewValidCommand (type, data) {
    this.repo3D.onNewValidCommand(type, data);
  }
}

export default Engine3D;
