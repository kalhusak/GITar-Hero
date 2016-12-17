import BABYLON from 'babylonjs';

export default class RenderTexture extends BABYLON.RenderTargetTexture {
  constructor (name, scene) {
    super(name + '_renderTexture', 2048, scene, true);
    this.beforeRender = ::this.beforeRender;
    this.afterRender = ::this.afterRender;
    this.scene = scene;
    scene.customRenderTargets.push(this);
    this.renderList = scene.meshes;
    this.onBeforeRender = this.beforeRender;
    this.onAfterRender = this.afterRender;
  }
}
