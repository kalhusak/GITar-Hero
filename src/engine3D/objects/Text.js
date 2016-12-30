import BABYLON from 'babylonjs';
import { cloneDeep } from 'lodash';

let textSeq = 0;

const config = {
  letterWidthPx: 16,
  widthRatio: 0.09,
  heightRatio: 0.1,
  textSizePx: 25,
  textTextureHeightPx: 40,
  yPositionOffset: 7
};

export default class Text {

  constructor (text, initPosition, scene, options = { hasAlpha: true }) {
    this._updatePosition = ::this._updatePosition;
    this.scene = scene;

    var textPlaneTextureWidth = config.letterWidthPx * text.length;
    var textPlaneTextureHeight = config.textTextureHeightPx;
    this.textPlaneTexture = new BABYLON.DynamicTexture('dynamicText' + textSeq,
      { width: textPlaneTextureWidth, height: textPlaneTextureHeight }, scene, true);
    this.textPlaneTexture.hasAlpha = options.hasAlpha;

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

    this.textPlaneTexture.drawText(text, null, config.textTextureHeightPx / 2 + config.textSizePx * 3 / 4,
      'bold ' + config.textSizePx + 'px Roboto Mono', options.color || 'yellow', 'transparent');

    this.scene.registerBeforeRender(() => this._updatePosition(initPosition));
  }

  _updatePosition (initPosition) {
    var pos = this.textPlane.position;
    if (pos.x !== initPosition.x) {
      pos.x = initPosition.x;
    }
    if (pos.z !== initPosition.z) {
      pos.z = initPosition.z;
    }
  }
}
