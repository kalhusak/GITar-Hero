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
  fadeDuration: 0.5,
  appearDuration: 0.5
};

export default class Text {

  constructor (text, initPosition, scene, options) {
    this._updatePosition = ::this._updatePosition;
    this.hide = ::this.hide;
    this.show = ::this.show;
    this.scene = scene;
    this.text = text;

    var textPlaneTextureWidth = config.letterWidthPx * text.length;
    var textPlaneTextureHeight = config.textTextureHeightPx;
    this.textPlaneTexture = new BABYLON.DynamicTexture('dynamicText' + textSeq,
      { width: textPlaneTextureWidth, height: textPlaneTextureHeight }, scene, true);
    this.textPlaneTexture.hasAlpha = options.hasAlpha ? options.hasAlpha : true;

    var textPlaneWidth = textPlaneTextureWidth * config.widthRatio;
    var textPlaneHeight = textPlaneTextureHeight * config.heightRatio;
    this.textPlane = BABYLON.MeshBuilder.CreatePlane('textPlane' + textSeq,
      { width: textPlaneWidth, height: textPlaneHeight, updatable: false }, scene);

    this.textPlane.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
    this.textPlane.material = new BABYLON.StandardMaterial('textPlaneMaterial' + textSeq, scene);
    this.textPlane.material.diffuseTexture = this.textPlaneTexture;
    this.textPlane.material.specularColor = new BABYLON.Color3(0, 0, 0);
    this.textPlane.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
    this.textPlane.material.backFaceCulling = false;

    this.textPlane.position = cloneDeep(initPosition);
    this.textPlane.position.y += config.yPositionOffset + (options.offset || 0);

    this.textPlaneTexture.drawText(text, null, config.textTextureHeightPx / 2 + config.textSizePx / 2,
       'bold ' + config.textSizePx + 'px Roboto Mono', options.color || 'pink', 'transparent');

    this.show();
    this.scene.registerBeforeRender(() => this._updatePosition(initPosition));
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
    var fading = new BABYLON.Animation.CreateAndStartAnimation('fade' + this.text, this.textPlane, 'visibility',
      config.animationFrames, duration, 1, 0, 0, null, () => { this.isVisible = false; });
  }

  show () {
    var duration = config.animationFrames * config.appearDuration
    var appear = new BABYLON.Animation.CreateAndStartAnimation('appear' + this.text, this.textPlane, 'visibility',
      config.animationFrames, duration, 0, 1, 0, null, () => { this.isVisible = true; });
  }

}
