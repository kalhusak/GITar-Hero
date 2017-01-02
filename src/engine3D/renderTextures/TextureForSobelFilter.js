import BABYLON from 'babylonjs';
import RenderTexture from './RenderTexture';

export default class TextureForSobelFilter extends RenderTexture {
  constructor (scene) {
    super('sobel', scene);
    this.invisibleTexture = new BABYLON.Texture('textures/black.png', scene);
  }

  beforeRender () {
    this.renderList.forEach((mesh) => {
      if (mesh.renderEdges) {
        if (mesh.renderTextureMaterial) {
          mesh._savedMaterial = mesh.material;
          mesh.material = mesh.renderTextureMaterial;
        }
      } else {
        mesh.setEnabled(false);
      }
    });

    this.scene.particleSystems.forEach((particleSystem) => {
      if (!particleSystem.renderEdges) {
        particleSystem._savedTexture = particleSystem.particleTexture;
        particleSystem.particleTexture = this.invisibleTexture;
      }
    });
  }

  afterRender () {
    this.renderList.forEach((mesh) => {
      mesh.setEnabled(true);
      if (mesh.renderTextureMaterial) {
        mesh.material = mesh._savedMaterial;
      }
    });

    this.scene.particleSystems.forEach((particleSystem) => {
      if (!particleSystem.renderEdges) {
        particleSystem.particleTexture = particleSystem._savedTexture;
      }
    });
  }
}
