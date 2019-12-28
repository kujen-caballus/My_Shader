#ifdef GL_ES 
precision mediump float;
#endif



uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

mat2 rotate(float a) 
{
	float c = cos(a),
	s = cos(a);
	return mat2(c, -s, s, c);
}


void main() {
	vec2 uv = 2.6*(2. * gl_FragCoord.xy - resolution) / resolution.y;
	vec3 color = vec3(0.0,1.0,0.1);
	uv.y+=0.6;
	if (uv.y < 0.0)   // horizontal mirroring
	{ 
	  uv.y *= 10.0;
	  color = vec3(-0.3);  // darker
	}
	vec3 rd = vec3(uv, (sin(time*.1+sin(time*0.006)*5.))*uv.y);
		
	float s = 0.5, t = .5;
	for (int i = 0; i < 9; i++) {
		t = sin(t+s);
		rd = abs(rd)  / dot(rd, rd) ; // kali iteration!! Thanks Kali
		rd -= s * 2.0 * t;
		rd.xy *= rotate(0.1 + time *0.017);
		rd.xz *= rotate(0.2 - time *0.053);
		rd.zy *= rotate(0.3 + time *0.081);
		rd -= s;
		s *= 0.6;
		t = -sin(t-s)*1.73;
		float b = 0.005;
		float ax = abs(rd.x);
		float ay = abs(rd.y);
		float az = abs(rd.z);
		color.gb -= .003 / max(abs(rd.x*0.2), abs(rd.y*0.8));
		color.gb +=  length(vec2(ax, ay))*0.08/max(ax*0.2, 6.2*ay);
		color.rb -= .002 / max(abs(rd.y*0.6), abs(rd.z*0.6));
		color.rb +=  length(vec2(ay, az))*0.09/max(ay*0.2, 6.2*az);
		color.rg += .001 / max(abs(rd.x*0.7), abs(rd.z*0.9));
		color.rg +=  length(vec2(ax, az))*0.08/max(ax*0.2, 6.2*az);
	}
	color *= 0.9;
	gl_FragColor = vec4(color, 1.);
}
