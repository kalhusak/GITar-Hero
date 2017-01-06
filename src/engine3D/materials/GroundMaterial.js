import BABYLON from 'babylonjs';
import { ground as groundStyle} from '../style.js'
var vertextShader = require('raw-loader!../shaders/ground.vert');
var fragmentShader = require('raw-loader!../shaders/ground.frag');

const config = {
  name: 'ground'
};

const shaderPath = {
  vertexElement: config.name + 'VertexShader',
  fragmentElement: config.name + 'PixelShader'
};

const options = {
  attributes: ['position', 'uv'],
  uniforms: ['worldViewProjection', 'worldView']
};

BABYLON.Effect.ShadersStore[shaderPath.vertexElement] = vertextShader;
BABYLON.Effect.ShadersStore[shaderPath.fragmentElement] = fragmentShader;

class GroundMaterial extends BABYLON.ShaderMaterial {
  constructor (meshLength, scene) {
    super(config.name + '_material', scene, config.name, options);
    this.update = ::this.update;

    this.scene = scene;
    this.maxHeight = groundStyle.maxHeight;
    this.flat = groundStyle.flat;
    this.wavy = groundStyle.wavy;
    this.fogDensity = groundStyle.fogDensity;
    this.hideWhenScroll = groundStyle.hideWhenScroll;
    this.meshLength = meshLength;
    this.uvOffset = new BABYLON.Vector2(0, 0);
    this.setTexture('heightMap', new BABYLON.Texture('textures/' + groundStyle.heightMap, scene));
    this.setTexture('codeTexture', new BABYLON.Texture('textures/'  + groundStyle.texture, scene));
    scene.registerBeforeRender(this.update);
  }

  update () {
    if (this.scene.getEngine().camera) {
      this.setVector3('cameraPosition', this.scene.getEngine().camera.position);
      this.setVector2('uvOffset', this.uvOffset);
      this.setFloat('maxHeight', this.maxHeight);
      this.setFloat('isFlat', this.flat ? 1.0 : 0.0);
      this.setFloat('isWavy', this.wavy ? 1.0 : 0.0);
      this.setFloat('hideWhenScroll', this.hideWhenScroll ? 1.0 : 0.0);
      this.setFloat('fogDensity', this.fogDensity);
      this.setFloat('meshLength', this.meshLength);
      this.uvOffset.y += groundStyle.speed;
    }
  }
}

export default GroundMaterial;
