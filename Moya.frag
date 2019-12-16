#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 resolution;

mat2 rotate(float a)
{
	float c = cos(a);
	float s = sin(a);
	return mat2(c, s, -s, c);
}
void main()
{
	vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 f = vec2(0.3);
	vec3 c = vec3(0.5,0.1,1.0);
	float light = 0.1;
	
	for (float x = 1.1; x < 12.0; x += 1.0)
	{
		uv *= rotate(x*200.0+sin(time*0.1));
		
		f = vec2(cos(cos(time*03.6+x + uv.x * x) - uv.y * dot(vec2(x + uv.y), vec2(sin(1.5*x), cos(2.0*x)))));
		light += (0.06 / distance(uv, f)) - (0.04 * distance(vec2((cos(sin(time)*0.3 + uv.xy))), vec2(uv)));
		
		c.y += sin(x+time+abs(uv.y))*0.3;
		if (c.y<0.5)
			c.y = 0.5;
		light-=x*0.00001 + c.y*0.0005;
		
	}
	
	c *= light;
	c.x += (sin(time*1.4)*0.2);
	
	gl_FragColor = vec4(0.1*c, 0.2);
}