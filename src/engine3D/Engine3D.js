import BABYLON from 'babylonjs';
import Scene from './Scene';
import Repo3D from './Repo3D';
import Camera from './Camera';
import SobelPostProcess from './SobelPostProcess';
import TextureForSobelFilter from './renderTextures/TextureForSobelFilter';
import Ground from './objects/Ground';

const config = {
  antialiasing: true
};

class Engine3D extends BABYLON.Engine {
  constructor (canvas) {
    super(canvas, config.antialiasing);
    this._renderTextOutline = ::this._renderTextOutline;
    this.onNewValidCommand = ::this.onNewValidCommand;
    this.renderLoop = ::this.renderLoop;
    this.scene = new Scene(this);
    this.repo3D = new Repo3D(this.scene);
    this.camera = new Camera(this.repo3D.HEAD, canvas, this.scene);
    this._renderTextOutline();
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

  _renderTextOutline () {
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
