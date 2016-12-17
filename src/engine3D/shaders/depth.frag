precision mediump float;

void main(void) {
	float depth =  1.0 - (2.0 / (100.0 + 1.0 - gl_FragCoord.z * (100.0 - 1.0)));
	gl_FragColor = vec4(depth, depth, depth, 1.0);
}
