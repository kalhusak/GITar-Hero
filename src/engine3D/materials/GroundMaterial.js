import BABYLON from 'babylonjs';
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
  uniforms: ['worldViewProjection', 'worldView', 'word']
};

BABYLON.Effect.ShadersStore[shaderPath.vertexElement] = vertextShader;
BABYLON.Effect.ShadersStore[shaderPath.fragmentElement] = fragmentShader;

class GroundMaterial extends BABYLON.ShaderMaterial {
  constructor (scene) {
    super(config.name + '_material', scene, config.name, options);
    this.update = ::this.update;

    this.scene = scene;
    this.maxHeight = 10;
    this.uvOffset = new BABYLON.Vector2(0, 0);
    this.setTexture('heightMap', new BABYLON.Texture('textures/heightMap.jpg', scene));
    scene.registerBeforeRender(this.update);
  }

  update () {
    if (this.scene.getEngine().camera) {
      this.setVector3('cameraPosition', this.scene.getEngine().camera.position);
      this.setVector2('uvOffset', this.uvOffset);
      this.setFloat('maxHeight', this.maxHeight);
      this.uvOffset.y += 0.004;
    }
  }
}

export default GroundMaterial;
