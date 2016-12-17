precision highp float;

varying vec2 vUV;

uniform sampler2D textureSampler;
uniform sampler2D texture;
uniform vec2 screenSize;
uniform bool useAdditionalTexture;

float getEdgeValue(in sampler2D sourceTexture) {
	float x = 1.0 / screenSize.x;
	float y = 1.0 / screenSize.y;
	vec4 horizEdge = vec4( 0.0 );
	horizEdge -= texture2D( sourceTexture, vec2( vUV.x - x, vUV.y - y ) ) * 1.0;
	horizEdge -= texture2D( sourceTexture, vec2( vUV.x - x, vUV.y     ) ) * 2.0;
	horizEdge -= texture2D( sourceTexture, vec2( vUV.x - x, vUV.y + y ) ) * 1.0;
	horizEdge += texture2D( sourceTexture, vec2( vUV.x + x, vUV.y - y ) ) * 1.0;
	horizEdge += texture2D( sourceTexture, vec2( vUV.x + x, vUV.y     ) ) * 2.0;
	horizEdge += texture2D( sourceTexture, vec2( vUV.x + x, vUV.y + y ) ) * 1.0;
	vec4 vertEdge = vec4( 0.0 );
	vertEdge -= texture2D( sourceTexture, vec2( vUV.x - x, vUV.y - y ) ) * 1.0;
	vertEdge -= texture2D( sourceTexture, vec2( vUV.x    , vUV.y - y ) ) * 2.0;
	vertEdge -= texture2D( sourceTexture, vec2( vUV.x + x, vUV.y - y ) ) * 1.0;
	vertEdge += texture2D( sourceTexture, vec2( vUV.x - x, vUV.y + y ) ) * 1.0;
	vertEdge += texture2D( sourceTexture, vec2( vUV.x    , vUV.y + y ) ) * 2.0;
	vertEdge += texture2D( sourceTexture, vec2( vUV.x + x, vUV.y + y ) ) * 1.0;
	vec3 edge = sqrt((horizEdge.rgb * horizEdge.rgb) + (vertEdge.rgb * vertEdge.rgb));

	return length(edge);
}

void main(void) {
	float edgeValue;
	if(useAdditionalTexture)
		edgeValue = getEdgeValue(texture);
	else
		edgeValue = getEdgeValue(textureSampler);

	if(edgeValue < 0.4)
		gl_FragColor = texture2D( textureSampler, vUV );
	else
		gl_FragColor = vec4(0, 0, 0, 1);
}
