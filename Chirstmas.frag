#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265



uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

vec3 star(vec2 uv, vec2 pos, vec3 color){
        float d = abs(uv.x - pos.x) + 0.0001;
        float e = abs(uv.y - pos.y) + 0.0001;
        return color * ((0.001 / d) + 0.00003 / (d * e) + 0.001 / e) / pow(1.0 + 100.0 * distance(uv, pos), 2.0);
}
float rand(vec2 n) { 
	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}
vec3 aces_tonemap(vec3 color){	
	mat3 m1 = mat3(
        0.59719, 0.07600, 0.02840,
        0.35458, 0.90834, 0.13383,
        0.04823, 0.01566, 0.83777
	);
	mat3 m2 = mat3(
        1.60475, -0.10208, -0.00327,
        -0.53108,  1.10813, -0.07276,
        -0.07367, -0.00605,  1.07602
	);
	vec3 v = m1 * color;    
	vec3 a = v * (v + 0.0245786) - 0.000090537;
	vec3 b = v * (0.983729 * v + 0.4329510) + 0.238081;
	return pow(clamp(m2 * (a / b), 0.0, 1.0), vec3(1.0 / 2.2));	
}

void main(void){

    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y) + time/1000.0;
    vec3 color1 = vec3(0.0, 1.0, 0.5);
    vec3 color2 = vec3(1.0, 0.0, 0.3);

	vec3 res=vec3(0.0);
	vec2 seed = vec2(4.0);
    for(float i = 0.0; i < 200.0; i++){
        //if (floor(mouse.x * 41.0) < i)
        //    break;
        float s = rand(seed += 1.1) * 2.0 - 1.0;
        float c = rand(seed += 1.1) * 2.0 - 1.0;
        float x = rand(seed += 1.1) * 2.0 - 1.0;
        float r = rand(seed += 1.1) * 2.0 - 1.0;
        float g = rand(seed += 1.1) * 2.0 - 1.0;
        float b = rand(seed += 1.1) * 2.0 - 1.0;
        res += star(p, vec2(s, c), vec3(r, g, b) * x);
    }


    gl_FragColor = vec4(aces_tonemap(res + length(res)), 1.0);
}