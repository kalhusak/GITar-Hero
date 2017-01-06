import BABYLON from 'babylonjs';
import Particles from './Particles';
import flare from './textures/flare.png';

const backgroundConfig = {
  sceneColor: new BABYLON.Color3(0.08, 0.08, 0.08),
  targetOffset: [new BABYLON.Vector3(0, -40, 100),
                new BABYLON.Vector3(100, -40, 100),
                new BABYLON.Vector3(-100, -40, 100),
                new BABYLON.Vector3(0, 40, 100),
                new BABYLON.Vector3(100, 40, 100),
                new BABYLON.Vector3(-100, 40, 100)],
  texture: flare,
  minEmitBox: new BABYLON.Vector3(-50, -50, -50),
  maxEmitBox: new BABYLON.Vector3(50, 50, 50),
  direction1: new BABYLON.Vector3(-50, -50, -50),
  direction2: new BABYLON.Vector3(50, 50, 50),
  minTime: 1,
  maxTime: 2.5,
  minSize: 0.2,
  maxSize: 0.7,
  emitRate: 100,
  minEmitPower: 0.1,
  maxEmitPower: 0.6,
  speed: 0.001
};

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
    const { minSize, maxSize } = backgroundConfig;

    const emitterMaterial = new BABYLON.StandardMaterial('emitterMaterial', this);
    emitterMaterial.emissiveColor = sceneColor;

    let emittersArray = [];
    let particlesArray = [];

    for(let i = 0; i < targetOffset.length; i ++) {
      let emitter = new BABYLON.Mesh.CreateBox('emitter' + i, 2, this);
      emitter.position = targetOffset[i];
      emitter.material = emitterMaterial;
      emittersArray.push(emitter);

      let particles = new Particles('background' + i, emitter, this, 500, flare);
      particles.setEmitBox(minEmitBox, maxEmitBox);
      particles.setDirections(direction1, direction2);
      particles.setLifeTimes(minTime, maxTime);
      particles.setSizes(minSize, maxSize);
      particles.setEmitParams(emitRate, minEmitPower, maxEmitPower, speed);
      particlesArray.push(particles);
    }

    this.light.excludedMeshes = emittersArray;
    this.backgroundParticles = particlesArray;
  }

  updateBackgroundParticlesEmitter (newPosition) {
    const { targetOffset } = backgroundConfig;
    let len = Math.min(this.backgroundParticles.length, targetOffset.length);
    for(let i = 0; i < len; i++){
      this.backgroundParticles[i].emitter.position = newPosition.add(targetOffset[i]);
    }
  }
}

export default Scene;
