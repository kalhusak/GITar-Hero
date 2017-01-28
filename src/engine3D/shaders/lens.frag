precision highp float;

varying vec2 vUV;

uniform sampler2D textureSampler;
uniform float time;
uniform float flare1Power;
uniform float flare2Power;
uniform float flare3Power;
uniform float flare4Power;
uniform float speed;
uniform bool displayStar;
const vec3 lum = vec3(0.299, 0.587, 0.114);

vec3 lensflare(vec2 pos)
{
	vec2 uv = vUV.xy - 0.5;
	vec2 main = uv - pos;
	vec2 uvd = uv*(length(uv));

	float ang = atan(main.y, main.x);
	float dist=length(main);
	dist = pow(dist,.1);

	float f0 = 1.0/(length(main)*16.0+1.0);

	f0 = f0+f0*(sin((ang+time/18.0)*12.0)*.1+dist*.1+.8);

	float f2 = max(1.0/(1.0+32.0*pow(length(uvd+0.8*pos),2.0)),.0)*00.25 * flare1Power;
	float f22 = max(1.0/(1.0+32.0*pow(length(uvd+0.85*pos),2.0)),.0)*00.23 * flare1Power;
	float f23 = max(1.0/(1.0+32.0*pow(length(uvd+0.9*pos),2.0)),.0)*00.21 * flare1Power;

	vec2 uvx = mix(uv,uvd,-0.5);

	float f4 = max(0.01-pow(length(uvx+0.4*pos),2.4),.0)*6.0 * flare2Power;
	float f42 = max(0.01-pow(length(uvx+0.45*pos),2.4),.0)*5.0 * flare2Power;
	float f43 = max(0.01-pow(length(uvx+0.5*pos),2.4),.0)*3.0 * flare2Power;

	uvx = mix(uv,uvd,-.4);

	float f5 = max(0.01-pow(length(uvx+0.2*pos),5.5),.0)*2.0 * flare3Power;
	float f52 = max(0.01-pow(length(uvx+0.4*pos),5.5),.0)*2.0 * flare3Power;
	float f53 = max(0.01-pow(length(uvx+0.6*pos),5.5),.0)*2.0 * flare3Power;

	uvx = mix(uv,uvd,-0.5);

	float f6 = max(0.01-pow(length(uvx-0.3*pos),1.6),.0)*6.0 * flare4Power;
	float f62 = max(0.01-pow(length(uvx-0.325*pos),1.6),.0)*3.0 * flare4Power;
	float f63 = max(0.01-pow(length(uvx-0.35*pos),1.6),.0)*5.0 * flare4Power;

	vec3 c = vec3(.0);

	c.r+=f2+f4+f5+f6;
	c.g+=f22+f42+f52+f62;
	c.b+=f23+f43+f53+f63;
	if (displayStar) {
		c+=vec3(f0);
	}

	return c;
}

vec3 cc(vec3 color, float factor,float factor2) // color modifier
{
	float w = color.x+color.y+color.z;
	return mix(color,vec3(w)*factor,w*factor2);
}

void main(void) {
	vec3 color = texture2D(textureSampler, vUV).rgb;
	float x = sin(time/(speed))*.5;
	float y = sin((time/speed)*.913)*.5;
	vec3 flare = lensflare(vec2( x, y));
	//color += flare;
	//color = cc(flare,.5,.1);
	gl_FragColor = vec4(mix(color, flare, dot(flare, lum)), 1.0);
	//gl_FragColor = vec4(flare, 1.0);
}
