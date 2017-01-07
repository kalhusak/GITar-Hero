import BABYLON from 'babylonjs';
import flare from '../static/textures/flare.png';

const config = {
  maxNumberOfParticles: 2000,
  minSize: 0.5,
  maxSize: 2,
  minTime: 0.5,
  maxTime: 2,
  emitRate: 500,
  minEmitPower: 1,
  maxEmitPower: 3,
  speed: 0.004,
  minEmitBox: new BABYLON.Vector3(-1, 0, 0),
  maxEmitBox: new BABYLON.Vector3(1, 0, 0),
  minAngularSpeed: 0,
  maxAngularSpeed: Math.Pi,
  colors: {
    color1: new BABYLON.Color3.White(),// (0.7, 0.8, 1.0, 1.0),
    color2: new BABYLON.Color3.White(),// (0.2, 0.5, 1.0, 1.0),
    colorDead: new BABYLON.Vector3(0, 0, 0)
  },
  directions: {
    direction1: new BABYLON.Vector3(-25, 20, -15),
    direction2: new BABYLON.Vector3(25, -20, -15),
    gravity: new BABYLON.Vector3(0, 0, 0)
  }
};

class Particles extends BABYLON.ParticleSystem {
  constructor (name, emitter, scene, number = config.maxNumberOfParticles, texture = flare) {
    super(`${name}_particles`, number, scene);

    this.setEmitter = ::this.setEmitter;
    this.setEmitParams = ::this.setEmitParams;
    this.setEmitBox = ::this.setEmitBox;
    this.setLifeTimes = ::this.setLifeTimes;
    this.setSizes = ::this.setSizes;
    this.setColors = ::this.setColors;
    this.setDirections = ::this.setDirections;
    this.setAngularSpeed = ::this.setAngularSpeed;

    this.emitter = emitter;
    this.particleTexture = new BABYLON.Texture(texture, scene);
    this.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    this.setEmitParams();
    // this.setEmitBox();
    this.setLifeTimes();
    this.setSizes();
    this.setColors();
    this.setDirections();
    // this.setAngularSpeed();

    this.start();
  }

  setEmitter (emitter) {
    this.emitter = emitter;
  }

  setEmitParams (emitRate = config.emitRate, minEmitPower = config.minEmitPower, maxEmitPower = config.maxEmitPower, speed = config.speed) {
    this.emitRate = emitRate;
    this.minEmitPower = minEmitPower;
    this.maxEmitPower = maxEmitPower;
    this.updateSpeed = speed;
  }

  setEmitBox (minEmitBox = config.minEmitBox, maxEmitBox = config.maxEmitBox) {
    this.minEmitBox = minEmitBox;
    this.maxEmitBox = maxEmitBox;
  }

  setLifeTimes (minTime = config.minTime, maxTime = config.maxTime) {
    this.minLifeTime = minTime;
    this.maxLifeTime = maxTime;
  }

  setSizes (minSize = config.minSize, maxSize = config.maxSize) {
    this.minSize = minSize;
    this.maxSize = maxSize;
  }

  setColors (color1 = config.colors.color1, color2 = config.colors.color2, colorDead = config.colors.colorDead) {
    this.color1 = color1;
    this.color2 = color2;
    this.colorDead = colorDead;
  }

  setDirections (direction1 = config.directions.direction1, direction2 = config.directions.direction2, gravity = config.directions.gravity) {
    this.direction1 = direction1;
    this.direction2 = direction2;
    this.gravity = gravity;
  }

  setAngularSpeed (minAngularSpeed = config.minAngularSpeed, maxAngularSpeed = config.maxAngularSpeed) {
    this.minAngularSpeed = minAngularSpeed;
    this.maxAngularSpeed = maxAngularSpeed;
  }
}

export default Particles;
