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

        /* var pipeline = new BABYLON.StandardRenderingPipeline("standard", scene, 1.0 / devicePixelRatio, null, [camera]);
     pipeline.lensStarTexture = new BABYLON.Texture("http://i.imgur.com/TjGJJKM.png", scene);
     pipeline.lensColorTexture = new BABYLON.Texture("http://i.imgur.com/fkaUumP.png", scene);
     //pipeline.lensFlareDistortionStrength = 1;
    //  pipeline.depthOfFieldDistance =1;
     pipeline.LensFlareEnabled = true;
     pipeline.lensFlareStength = 1;
     pipeline.gaussianCoefficient = 0.2;*/




     var pipeline2 = new BABYLON.StandardRenderingPipeline("standard", this.scene, 1.0 / devicePixelRatio, null, [this.camera]);
     //pipeline2.lensStarTexture = new BABYLON.Texture("http://i.imgur.com/VPxsJ2G.png", this.scene);
     //pipeline2.lensStarTexture = new BABYLON.Texture("http://i.imgur.com/JFmRDHI.png", this.scene);
    //
    pipeline2.lensStarTexture = new BABYLON.Texture("http://i.imgur.com/SW2DRY1.png", this.scene);


     pipeline2.lensColorTexture = new BABYLON.Texture("http://i.imgur.com/JPeKWEB.png", this.scene);
     pipeline2.lensFlareDistortionStrength = 10;
     pipeline2.depthOfFieldDistance = 6;
     pipeline2.LensFlareEnabled = true;
     pipeline2.lensFlareStength = 2;
     pipeline2.gaussianCoefficient = 0.08;
     pipeline2.blurWidth = 9;

/*
     var lensEffect = new BABYLON.LensRenderingPipeline('lens', {
       edge_blur: 1.0,
       dof_focus_distance: 50,
       dof_darken: 0.7
     }, this.scene, 1.0, this.camera);

*/
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
