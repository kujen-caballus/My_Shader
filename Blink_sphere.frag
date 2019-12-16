// global remix - Del 30/10/2019
#ifdef GL_ES
precision highp float;
#endif



uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;



void main(void){
	vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y); 
	uv.x += sin(time)*0.3;
	uv.y += cos(time)*0.3;
	float dd = 1.0-length(uv*1.5);
	vec3 Color = mix(vec3(0.1569, 0.0157, 0.3804),vec3(6.66,1.2,0.9),dd * abs(sin(5.0 * time)));
	gl_FragColor = vec4(Color,1.0);
}
