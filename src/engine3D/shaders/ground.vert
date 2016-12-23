precision highp float;
attribute vec3 position;
attribute vec2 uv;
uniform mat4 worldViewProjection;
uniform mat4 worldView;
uniform vec2 uvOffset;
uniform float maxHeight;

uniform sampler2D heightMap;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

const vec2 size = vec2(2.0,0.0);
const ivec3 off = ivec3(-1,0,1);

float getHeightFromMap(vec2 newUv) {
    return texture2D(heightMap, newUv).x;
}

vec4 textureOffset(vec2 uv, float xOffset, float yOffset) {
    vec2 newUv = vec2(uv.x + xOffset, uv.y + yOffset);
    return texture2D(heightMap, newUv);
}

// TODO fix it. It does not work well
vec3 calculateNormal(vec2 newUv) {
    float leftHeight = textureOffset(newUv, -1.0, 0.0).x;
    float rightHeight = textureOffset(newUv, 1.0, 0.0).x;
    float bottomHeight = textureOffset(newUv, 0.0, -1.0).x;
    float topHeight = textureOffset(newUv, 0.0, 1.0).x;
    vec3 va = normalize( vec3(size.xy, rightHeight - leftHeight) );
    vec3 vb = normalize( vec3(size.yx, topHeight - bottomHeight) );
    return cross(va,vb);
}

void main() {
    vec2 newUv = uv + uvOffset;
    float height = getHeightFromMap(newUv);
    vec3 normal = calculateNormal(newUv);
    vec3 newPosition = position;
    newPosition.y += height * maxHeight;
    vUv = newUv;
    vNormal = normal;
    vPosition = newPosition;
    gl_Position = worldViewProjection * vec4(newPosition, 1.0);
}
