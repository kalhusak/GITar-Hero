precision highp float;

attribute vec3 position;

uniform mat4 worldViewProjection;
uniform vec3 diffuseColor;

varying vec3 vColor;

void main() {
  vColor = diffuseColor;
  gl_Position = worldViewProjection * vec4(position, 1.0);
}
