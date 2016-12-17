precision highp float;
varying vec3 fNormal;

const vec3 lightPos = vec3(1.0,1.0,-5.0);
const vec3 ambientColor = vec3(0.1, 0.1, 0.1);
const vec3 diffuseColor = vec3(1, 0.66, 0.0);
const vec3 specColor = vec3(0.5, 0.5, 0.5);
const float shininess = 50.0;
const float celShading = 3.0;

float celShade(float d) {
  float E = 0.05;
  d *= celShading;
  float r = 1.0 / (celShading-0.5);
  float fd = floor(d);
  float dr = d * r;
  if (d > fd-E && d < fd+E) {
    float last = (fd - sign(d - fd))*r;
    return mix(last, fd*r,
      smoothstep((fd-E)*r, (fd+E)*r, dr));
  } else {
    return fd*r;
  }
}

void main() {
  vec3 en = normalize(fNormal);
  vec3 ln = normalize(lightPos);
  vec3 hn = normalize(ln + vec3(0, 0, 1));
  float E = 0.05;

  float df = max(0.0, dot(en, ln));
  float sf = max(0.0, dot(en, hn));

  float cdf = celShade(df);

  sf = pow(sf, shininess);

  if (sf > 0.5 - E && sf < 0.5 + E) {
    sf = smoothstep(0.5 - E, 0.5 + E, sf);
  } else {
    sf = step(0.5, sf);
  }

  float csf = sf;

  vec3 color = ambientColor + cdf * diffuseColor + csf * specColor;


  gl_FragColor = vec4(color, 1.0);
}
