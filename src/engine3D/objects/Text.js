import BABYLON from 'babylonjs';
import { cloneDeep } from 'lodash';

let textSeq = 0;

const config = {
  letterWidthPx: 90,
  widthRatio:  0.0225,
  heightRatio: 0.02,
  textSizePx: 150,
  textTextureHeightPx: 130,
  yPositionOffset: 7,
  animationFrames: 30,
  fadeDuration: 1,
  appearDuration: 1
};

export default class Text {

  constructor (text, initPosition, scene, options) {
    this._draw = ::this._draw;
    this._updatePosition = ::this._updatePosition;
    this.hide = ::this.hide;
    this.show = ::this.show;
    this.scene = scene;
    this.text = text;

    var textureWidth = config.letterWidthPx * text.length;
    var textureHeight = config.textTextureHeightPx;

    this.texture = new BABYLON.DynamicTexture('dynamicText' + textSeq,
      { width: textureWidth, height: textureHeight }, scene, true);

    var textPlaneWidth = textureWidth * config.widthRatio;
    var textPlaneHeight = textureHeight * config.heightRatio;

    this.textPlane = BABYLON.MeshBuilder.CreatePlane('textPlane' + textSeq,
      { width: textPlaneWidth, height: textPlaneHeight, updatable: false }, scene);

    var material = new BABYLON.StandardMaterial('textPlaneMaterial' + textSeq, scene);
    material.opacityTexture = this.texture;
    material.diffuseTexture = this.texture;
    material.specularColor = options.specularColor || new BABYLON.Color3(0, 0, 0);
    material.emissiveColor = options.emissiveColor || new BABYLON.Color3(0.8, 0.8, 0.8);
    material.specularPower = options.specularPower || 0;
    material.backFaceCulling = false;

    this.textPlane.material = material;
    this.textPlane.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
    this.textPlane.position = cloneDeep(initPosition);

    this.textPlane.position.y += config.yPositionOffset + (options.offset || 0);

    this._draw('white');
    this._draw(options.color || 'red');
    this.show();
    this.scene.registerBeforeRender(() => this._updatePosition(initPosition));
  }

  _draw (color) {
    this.texture.drawText(this.text, null, config.textTextureHeightPx / 2 + config.textSizePx / 2,
       'bold ' + config.textSizePx + 'px Roboto Mono', color, 'transparent');
  }

  _updatePosition (initPosition) {
    if (this.textPlane) {
      var pos = this.textPlane.position;
      if (pos) {
        if (pos.x !== initPosition.x) {
          pos.x = initPosition.x;
        }
        if (pos.z !== initPosition.z) {
          pos.z = initPosition.z;
        }
      }
    }
  }

  hide () {
    var duration = config.animationFrames * config.fadeDuration;
    var fade = new BABYLON.Animation.CreateAndStartAnimation('fade' + this.text, this.textPlane.material, 'alpha',
      config.animationFrames, duration, 1, 0, 0, null, () => { this.isVisible = false; });
  }

  show () {
    var duration = config.animationFrames * config.appearDuration;
    var appear = new BABYLON.Animation.CreateAndStartAnimation('appear' + this.text, this.textPlane.material, 'alpha',
      config.animationFrames, duration, 0, 1, 0, null, () => { this.isVisible = true; });
  }

}
