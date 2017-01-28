import BABYLON from 'babylonjs';
var lensShader = require('raw-loader!../shaders/lens.frag');

const config = {
  name: 'lens',
  sampling: BABYLON.Texture.BILINEAR_SAMPLINGMODE,
  reusable: true
};

const options = {
  additionalUniforms: ['time', 'flare1Power', 'flare2Power', 'flare3Power', 'flare4Power', 'speed', 'displayStar'],
  additionalTextures: []
};

BABYLON.Effect.ShadersStore[config.name + 'PixelShader'] = lensShader;

export default class LensPostProcess extends BABYLON.PostProcess {
  constructor (engine) {
    super(config.name + 'PostProcess', config.name, options.additionalUniforms,
      null, 1, engine.camera, config.sampling, engine, config.reusable);
    this._onApply = ::this._onApply;
    this._showConfiguration = ::this._showConfiguration;

    this.startTime = new Date().getTime();
    this.flare1Power = 2.0;
    this.flare2Power = 2.0;
    this.flare3Power = 2.0;
    this.flare4Power = 2.0;
    this.speed = 2.0;
    this.displayStar = false;
    this.onApply = this._onApply;
    this._showConfiguration();
  }

  _onApply (effect) {
    effect.setFloat('time', (new Date().getTime() - this.startTime) / 1000.0)
    effect.setFloat('flare1Power', this.flare1Power);
    effect.setFloat('flare2Power', this.flare2Power);
    effect.setFloat('flare3Power', this.flare3Power);
    effect.setFloat('flare4Power', this.flare4Power);
    effect.setFloat('speed', this.speed);
    effect.setBool('displayStar', Boolean(this.displayStar));
  }

  _showConfiguration () {
    this.gui = new dat.GUI();
    this.gui.width = 400;
    this.gui.add(this, 'flare1Power').min(0.0).max(5).step(0.01);
    this.gui.add(this, 'flare2Power').min(0.0).max(5).step(0.01);
    this.gui.add(this, 'flare3Power').min(0.0).max(5).step(0.01);
    this.gui.add(this, 'flare4Power').min(0.0).max(5).step(0.01);
    this.gui.add(this, 'speed').min(0.01).max(10).step(0.01);
    this.gui.add(this, 'displayStar');
  }
}
