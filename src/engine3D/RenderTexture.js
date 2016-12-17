import BABYLON from 'babylonjs';

export default class RenderTexture extends BABYLON.RenderTargetTexture {
  constructor (scene) {
    super('normalRenderTexture', 2048, scene, true);
    this._onBeforeRender = ::this._onBeforeRender;
    this._onAfterRender = ::this._onAfterRender;

    scene.customRenderTargets.push(this);
    this.renderList = scene.meshes;
    this.onBeforeRender = this._onBeforeRender;
    this.onAfterRender = this._onAfterRender;
  }

  _onBeforeRender () {
    this.renderList.forEach((mesh) => {
      if (mesh.renderTextureMaterial) {
        mesh._savedMaterial = mesh.material;
        mesh.material = mesh.renderTextureMaterial;
      }
    });
  }

  _onAfterRender () {
    this.renderList.forEach((mesh) => {
      mesh.material = mesh._savedMaterial;
    });
  }
}
