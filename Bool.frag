#ifdef GL_ES
precision mediump float;
#endif



uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

float smoothMin(float d1, float d2, float k) {
	float h = exp(-k * d1) + exp(-k * d2);
	return -log(h) / k;
}

mat2 rotate(float r) {
	float s = sin(r), c = cos(r);
	return mat2(s, c, -c, s);
}

float box(vec3 p, vec3 s) {
	p = abs(p) - s;
	return length(max(p, 0.)) - 0.2;
}

float distFunc(vec3 p) {
	p.x += sin(time * 0.3) * 2.;
	
	vec3 s = vec3(0.001, 0.5, 0.001) * abs(cos(time * 0.3));
	
	p.xz *= rotate(time * 0.3);
	p.yz *= rotate(time * 0.1);
	
	float dist = box(p, s);
	for (int i = 0; i < 20; i++) {
		p.yz *= rotate(1.25 + sin(time) * 0.1);
		p.y -= s.y * 1.2;
		p.x += sin(time*0.4) * 0.2;
		p.z += cos(time * 0.1) * 0.1;
		
		s *= 0.9 + 0.1 * cos(time * 0.3);
		
		dist = smoothMin(dist, box(p, s), 7.) - s.z * 30.;
	}
	return dist + 0.0;
}

vec3 normal(vec3 p) {
	float d = 0.0001;
	return normalize(vec3(
		distFunc(p + vec3(d, 0, 0)) - distFunc(p - vec3(d, 0, 0)),
		distFunc(p + vec3(0, d, 0)) - distFunc(p - vec3(0, d, 0)),
		distFunc(p + vec3(0, 0, d)) - distFunc(p - vec3(0, 0, d))
		));
}

void main( void ) {
	vec2 p = (gl_FragCoord.xy * 2. - resolution.xy) / min(resolution.x, resolution.y);
	vec3 cameraPos = vec3(0, 0, -10);
	float screenZ = 2.5;
	vec3 rayDir = normalize(vec3(p, screenZ));
	vec3 lightDir = normalize(vec3(1, 1, -2));
	
	vec3 col = vec3(1);
	float totalDist = 0.3;
	
	for (int i = 0; i < 99; i++) {
		vec3 pos = cameraPos + rayDir * totalDist;
		float dist = distFunc(pos);
		if (dist < 0.0001) {
			col = vec3(0.1, 0.4, 0.1) * 1.3*dot(normal(pos), lightDir);
			break;
		}
		totalDist += dist;
	}
	
	gl_FragColor = vec4(col, 0.5);
}