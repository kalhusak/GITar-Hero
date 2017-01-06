precision highp float;
uniform vec3 cameraPosition;

varying vec3 vPosition;
varying vec2 vUv;
varying vec2 vUvWithOffset;

uniform sampler2D codeTexture;
uniform float hideWhenScroll;
uniform float fogDensity;
uniform float meshLength;

const vec4 fogColor = vec4(0.2, 0.2, 0.3, 1.0); // Set to background/clear color

void main() {
    vec4 textureColor = texture2D(codeTexture, vUvWithOffset);
    if (textureColor.r < 0.1 && textureColor.g < 0.1 && textureColor.b < 0.1) {
        discard;
    }

    float depth = 0.0;
    float fogFactor = 0.0;
    if (hideWhenScroll > 0.5) {
        depth = gl_FragCoord.z / gl_FragCoord.w;
        fogFactor = smoothstep(340.0 * fogDensity, 340.0, depth);
    } else {
        depth = abs(vPosition.z);
        float halfMeshLength = meshLength/2.0;
        fogFactor = smoothstep(halfMeshLength * fogDensity, halfMeshLength, depth);
    }

    gl_FragColor = mix(textureColor, fogColor, fogFactor);
}
