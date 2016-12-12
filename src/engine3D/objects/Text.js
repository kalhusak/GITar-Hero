import BABYLON from 'babylonjs';

let textSeq = 0;

const config = {
  mapWidth: 2048,
  textSize: 20
};

export default class Text {

  constructor (text, initPosition, scene) {
    this.scene = scene;

    this.textPlaneTexture = new BABYLON.DynamicTexture('dynamicText' + textSeq, config.mapWidth, scene, true);
    this.textPlaneTexture.hasAlpha = true;

    this.textPlane = BABYLON.Mesh.CreatePlane('textPlane' + textSeq, config.textSize, scene, false);
    this.textPlane.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
    this.textPlane.material = new BABYLON.StandardMaterial('textPlaneMaterial' + textSeq, scene);
    this.textPlane.material.diffuseTexture = this.textPlaneTexture;
    this.textPlane.material.specularColor = new BABYLON.Color3(0, 0, 0);
    this.textPlane.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
    this.textPlane.material.backFaceCulling = false;
    this.textPlane.position = initPosition;

    this.textPlaneTexture.drawText(text, null, 150, 'bold 140px tahoma', 'yellow', 'transparent');
  }
}
