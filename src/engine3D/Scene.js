import BABYLON from 'babylonjs';
import Particles from './Particles';
import flare from './textures/flare.png';

const backgroundConfig = {
  targetOffset: new BABYLON.Vector3(0, -40, 400),
  texture: flare,
  minEmitBox: new BABYLON.Vector3(-6, -6, 0),
  maxEmitBox: new BABYLON.Vector3(6, 6, 0),
  direction1: new BABYLON.Vector3(-50, -50, -100),
  direction2: new BABYLON.Vector3(50, 50, -100),
  minTime: 2,
  maxTime: 6,

}

class Scene extends BABYLON.Scene {
  constructor (engine) {
    super(engine);

    this.initBackgroundParticles = ::this.initBackgroundParticles;
    this.updateBackgroundParticlesEmitter = ::this.updateBackgroundParticlesEmitter;
    this.initFog = ::this.initFog;

    // TODO make light management object
    const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(3, 1, -3), this);
    this.clearColor = new BABYLON.Color3(0.05, 0.05, 0.05);

    this.initBackgroundParticles();
    // this.initFog();
  }

  initFog () {
    this.fogMode = BABYLON.Scene.FOGMODE_EXP;
    this.fogDensity = 0.001;
    this.fogColor = new BABYLON.Color3(0, 0, 0);
  }

  initBackgroundParticles () {
    const { targetOffset, minEmitBox, maxEmitBox, direction1, direction2, minTime, maxTime } = backgroundConfig;
    this.backgroundParticles = new Particles('background', targetOffset, this, flare);
    this.backgroundParticles.setEmitBox(minEmitBox, maxEmitBox);
    this.backgroundParticles.setDirections(direction1, direction2);
    this.backgroundParticles.setLifeTimes(minTime, maxTime);
  }

  updateBackgroundParticlesEmitter (newPosition) {
    let { targetOffset } = backgroundConfig;
    this.backgroundParticles.emitter = newPosition.add(targetOffset);
  }
}

export default Scene;
