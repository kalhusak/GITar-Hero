import BABYLON from 'babylonjs';
var sobelShader = require('raw-loader!./shaders/sobel.frag');

const config = {
  name: 'sobel',
  sampling: BABYLON.Texture.BILINEAR_SAMPLINGMODE,
  reusable: true
};

const options = {
  additionalUniforms: ['screenSize', 'useAdditionalTexture'],
  additionalTextures: ['texture']
};

BABYLON.Effect.ShadersStore[config.name + 'PixelShader'] = sobelShader;

export default class SobelPostProcess extends BABYLON.PostProcess {
  constructor (engine, texture) {
    super(config.name + 'PostProcess', config.name, options.additionalUniforms,
      texture ? options.additionalTextures : null, 1, engine.camera, config.sampling, engine, config.reusable);
    this._onApply = ::this._onApply;

    this.onApply = this._onApply;
    this.texture = texture;
  }

  _onApply (effect) {
    effect.setFloat2('screenSize', this.width, this.height);
    if (this.texture) {
      effect.setTexture('texture', this.texture);
    }
    effect.setBool('useAdditionalTexture', Boolean(this.texture));
  }
}
