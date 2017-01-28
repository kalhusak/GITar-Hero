precision highp float;

varying vec2 vUV;

uniform sampler2D textureSampler;
uniform float outerRing;
uniform float innerRing;
uniform float power;

const vec2 center = vec2(0.5,.5);
const vec4 vignetteColor = vec4(.0, .0, .0, 1.0);

void main(void) {
	vec4 color = texture2D(textureSampler, vUV);
	float dist  = distance(center, vUV) * 1.414213; // multiplyed by 1.414213 to fit in the range of 0.0 to 1.0
	float vignette = (outerRing - dist) / (outerRing - innerRing);
	vignette = 1.0 - clamp(vignette, 0.0, 1.0);
	vignette *= power;

	gl_FragColor = mix(color, vignetteColor, vignette);
}
