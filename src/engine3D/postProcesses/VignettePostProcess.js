import BABYLON from 'babylonjs';
import { vignette as vignetteStyle } from '../style.js';
var vignetteShader = require('raw-loader!../shaders/vignette.frag');

const config = {
  name: 'vignette',
  sampling: BABYLON.Texture.BILINEAR_SAMPLINGMODE,
  reusable: true
};

const options = {
  additionalUniforms: ['outerRing', 'innerRing', 'power'],
  additionalTextures: []
};

BABYLON.Effect.ShadersStore[config.name + 'PixelShader'] = vignetteShader;

export default class VignettePostProcess extends BABYLON.PostProcess {
  constructor (engine) {
    super(config.name + 'PostProcess', config.name, options.additionalUniforms,
      null, 1, engine.camera, config.sampling, engine, config.reusable);
    this._onApply = ::this._onApply;
    this._showConfiguration = ::this._showConfiguration;

    this.outerRing = vignetteStyle.outerRing;
    this.innerRing = vignetteStyle.innerRing;
    this.power = vignetteStyle.power;
    this.onApply = this._onApply;

    if (vignetteStyle.showConfiguration) {
      this._showConfiguration();
    }
  }

  _onApply (effect) {
    effect.setFloat('outerRing', this.outerRing);
    effect.setFloat('innerRing', this.innerRing);
    effect.setFloat('power', this.power);
  }

  _showConfiguration () {
    this.gui = new dat.GUI();
    this.gui.width = 400;
    this.gui.add(this, 'outerRing').min(0.0).max(1.0).step(0.01);
    this.gui.add(this, 'innerRing').min(0.0).max(1.0).step(0.01);
    this.gui.add(this, 'power').min(0.0).max(1.0).step(0.01);
  }
}
