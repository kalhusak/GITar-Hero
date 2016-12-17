precision highp float;

attribute vec3 position;
attribute vec3 normal;

uniform mat4 worldViewProjection;
uniform mat4 worldView;

varying vec3 fNormal;

void main() {
  fNormal = vec3(worldView * vec4(normal, 0.0));
  gl_Position = worldViewProjection * vec4(position, 1.0);
}
