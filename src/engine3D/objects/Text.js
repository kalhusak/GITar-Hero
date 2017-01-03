import BABYLON from 'babylonjs';
import { cloneDeep } from 'lodash';

let textSeq = 0;

const config = {
  letterWidthPx: 90,
  widthRatio:  0.00025,
  heightRatio: 0.02,
  textSizePx: 150,
  textTextureHeightPx: 130,
  yPositionOffset: 7
};

export default class Text {

  constructor (text, initPosition, scene, options) {
    this._updatePosition = ::this._updatePosition;
    this.scene = scene;

    var textPlaneTextureWidth = config.letterWidthPx * text.length;
    var textPlaneTextureHeight = config.textTextureHeightPx;
    this.textPlaneTexture = new BABYLON.DynamicTexture('dynamicText' + textSeq,
      { width: textPlaneTextureWidth, height: textPlaneTextureHeight }, scene, true);
    this.textPlaneTexture.hasAlpha = options.hasAlpha ? options.hasAlpha : true;

    var textPlaneWidth = textPlaneTextureWidth * config.widthRatio * config.letterWidthPx;
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

    // this.textPlaneTexture.drawText(text, null, config.textTextureHeightPx / 2 + config.textSizePx / 2,
    //   'bold ' + (config.textSizePx + 5) + 'px Roboto Mono', options.color || 'blue', 'transparent');
    //
    this.textPlaneTexture.drawText(text, null, config.textTextureHeightPx / 2 + config.textSizePx / 2,
       'bold ' + config.textSizePx + 'px Roboto Mono', options.color || '#E64A19', 'transparent');
    // this.textPlane.renderEdges = true;
    //
    // var y = config.textTextureHeightPx / 2 + config.textSizePx / 2;
    // // var textMid = (text.length * config.textSizePx) / 2;
    // var x = (text.length - 1) * 20.0 / 2.0;
    //
    // for (var i = 0; i < text.length; i++) {
    //
    //   this.textPlaneTexture.drawText(text[i], x - 5, y + 4,
    //     'bold ' + (config.textSizePx + 15) + 'px Roboto Mono', options.color || 'black', 'transparent');
    //
    //   this.textPlaneTexture.drawText(text[i], x, y,
    //     'bold ' + config.textSizePx + 'px Roboto Mono', options.color || 'red', 'transparent');
    //
    //
    //   x = x + config.textSizePx - 20.0;
    // }
    //
    // console.log(text, text.length);


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
}
