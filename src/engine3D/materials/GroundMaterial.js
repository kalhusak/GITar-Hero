import BABYLON from 'babylonjs';
import { ground as groundStyle } from '../style.js';
import { scene as sceneStyle }from '../style.js';
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
    const { maxHeight, flat, wavy, fogDensity, hideWhenScroll, heightMap, texture } = groundStyle;
    const { color } = sceneStyle;
    this.update = ::this.update;

    this.scene = scene;
    this.maxHeight = maxHeight;
    this.flat = flat;
    this.wavy = wavy;
    this.fogDensity = fogDensity;
    this.fogColor = new BABYLON.Vector4(color.r, color.g, color.b, 1);
    this.hideWhenScroll = hideWhenScroll;
    this.meshLength = meshLength;
    this.uvOffset = new BABYLON.Vector2(0, 0);
    this.setTexture('heightMap', new BABYLON.Texture('textures/' + heightMap, scene));
    this.setTexture('codeTexture', new BABYLON.Texture('textures/' + texture, scene));
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
      this.setVector4('fogColor', this.fogColor);
      this.setFloat('meshLength', this.meshLength);
      this.uvOffset.y += groundStyle.speed;
    }
  }
}

export default GroundMaterial;
