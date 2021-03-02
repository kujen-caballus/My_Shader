
precision highp float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
uniform sampler2D backbuffer;

bool map() {
	vec2 uv = floor(gl_FragCoord.xy - resolution / 2.);
	float zt = -9e9;
	float zb = 9e9;

	for (float y = -180.; y <= 180.; y += 4.) {
		float x = uv.x + y;
		if (abs(x) > 180.) continue;
		if (mod(x, 3.) != 0.) continue;

		float t = radians(length(vec2(x, y)));
		t += (time * .8) * 2.;
		float z = floor((cos(t)*100.-cos(t*4.)*sin(time)*20.))+(x + y);
		if (z == uv.y) {
			return z < zb || zt < z;
		}
		zt = max(zt, z);
		zb = min(zb, z);
	}
	return false;
}

void main( void ) {
	vec3 color = map() ? vec3(0, abs(sin(time)), 1) : vec3(0);
	gl_FragColor = vec4(color, 1);
}