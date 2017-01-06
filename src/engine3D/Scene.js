import BABYLON from 'babylonjs';
import Particles from './Particles';
import flare from './textures/flare.png';

const backgroundConfig = {
  sceneColor: new BABYLON.Color3(0.08, 0.08, 0.08),
  targetOffset: new BABYLON.Vector3(0, -40, 400),
  texture: flare,
  minEmitBox: new BABYLON.Vector3(-6, -6, 0),
  maxEmitBox: new BABYLON.Vector3(6, 6, 0),
  direction1: new BABYLON.Vector3(-50, -50, -100),
  direction2: new BABYLON.Vector3(50, 50, -100),
  minTime: 2,
  maxTime: 6,
  emitRate: 300,
  minEmitPower: 0.5,
  maxEmitPower: 1.5,
  speed: 0.002
}

class Scene extends BABYLON.Scene {
  constructor (engine) {
    super(engine);

    this.initBackgroundParticles = ::this.initBackgroundParticles;
    this.updateBackgroundParticlesEmitter = ::this.updateBackgroundParticlesEmitter;
    this.initFog = ::this.initFog;

    this.light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(3, 1, -3), this);
    this.clearColor = backgroundConfig.sceneColor;

    this.initBackgroundParticles();
    this.initFog();
  }

  initFog () {
    this.fogMode = BABYLON.Scene.FOGMODE_EXP;
    this.fogDensity = 0.002;
    this.fogColor = backgroundConfig.sceneColor;
  }

  initBackgroundParticles () {
    const { sceneColor, targetOffset, direction1, direction2, minTime, maxTime } = backgroundConfig;
    const { emitRate, minEmitPower, maxEmitPower, speed, minEmitBox, maxEmitBox } = backgroundConfig;
    const emitterMaterial = new BABYLON.StandardMaterial('emitterMaterial', this);
    emitterMaterial.emissiveColor = sceneColor;

    const emitter = new BABYLON.Mesh.CreateBox('emitter', 150, this);
    emitter.position = targetOffset;
    emitter.material = emitterMaterial;

    const particles = new Particles('background', emitter, this, flare);
    // particles.setEmitBox(minEmitBox, maxEmitBox);
    particles.setDirections(direction1, direction2);
    particles.setLifeTimes(minTime, maxTime);
    particles.setEmitParams(emitRate, minEmitPower, maxEmitPower, speed);

    this.emitter = emitter;
    this.light.excludedMeshes = [this.emitter];
    this.backgroundParticles = particles;
  }

  updateBackgroundParticlesEmitter (newPosition) {
    const { targetOffset } = backgroundConfig;
    this.backgroundParticles.emitter.position = newPosition.add(targetOffset);
  }
}

export default Scene;
