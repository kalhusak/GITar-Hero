precision highp float;
attribute vec3 position;
attribute vec2 uv;

uniform mat4 worldViewProjection;
uniform mat4 worldView;
uniform vec2 uvOffset;
uniform float maxHeight;
uniform float isFlat;
uniform float isWavy;

uniform sampler2D heightMap;

varying vec3 vPosition;
varying vec2 vUv;
varying vec2 vUvWithOffset;

vec3 calculatePosistion(){
    if (isFlat > 0.5)
        return position;
    float height  = 0.0;
    if (isWavy < 0.5)
        height = texture2D(heightMap, uv + uvOffset).x;
    else
        height = texture2D(heightMap, uv).x;
    vec3 newPosition = position;
    newPosition.y += height * maxHeight;
    return newPosition;
}

void main() {
    vUv = uv;
    vUvWithOffset = uv + uvOffset;
    vec3 newPosition = calculatePosistion();
    vPosition = position;
    gl_Position = worldViewProjection * vec4(newPosition, 1.0);
}
