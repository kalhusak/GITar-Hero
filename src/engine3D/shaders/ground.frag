precision highp float;
uniform mat4 world;
uniform vec3 cameraPosition;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

uniform sampler2D heightMap;

void main() {
   gl_FragColor = texture2D(heightMap ,vUv);
}
