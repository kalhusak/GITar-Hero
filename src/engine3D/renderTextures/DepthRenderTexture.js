import BABYLON from 'babylonjs';
import RenderTexture from './RenderTexture';
import DepthMaterial from '../materials/DepthMaterial';

export default class DepthRenderTexture extends RenderTexture {
  constructor (scene, forEdge) {
    super('depth', scene);
    this.depthMaterial = new DepthMaterial(scene);
    this.blackTexture = new BABYLON.Texture('textures/black.png', scene);
    this.forEdge = forEdge;
  }

  beforeRender () {
    let forEdge = this.forEdge;
    this.renderList.forEach((mesh) => {
      if (forEdge && !mesh.renderEdges) {
        mesh.setEnabled(false);
      } else {
        mesh._savedMaterial = mesh.material;
        mesh.material = this.depthMaterial;
      }
    });
  }

  afterRender () {
    this.renderList.forEach((mesh) => {
      mesh.setEnabled(true);
      if (mesh.renderEdges) {
        mesh.material = mesh._savedMaterial;
      }
    });
  }
}
