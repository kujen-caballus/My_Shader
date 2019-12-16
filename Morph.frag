	
#ifdef GL_ES
precision mediump float;
#endif
 

 
uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;


vec2 square(vec2 p){
    return vec2(abs(p.x) + abs(p.y),0.7);
}
vec2 circle(vec2 p){
    return vec2(length(p),0.7);
}

vec2 circle1(vec2 p){
    return vec2(abs(p.x) + abs(p.y),0.4);
}
 
vec2 morphing(vec2 p){
    float t = time * 2.0;
    int pair = int(floor(mod(t,3.0)));
    float a = smoothstep(0.2,0.8,mod(t,1.0));

    if(pair == 0) return mix(circle1(p),square(p),a);
    if(pair == 1) return mix(square(p),circle(p),a);
            else return mix(circle(p),circle1(p),a);
}

    
void main() {
   vec2 p = (gl_FragCoord.xy * 2.0 - resolution) /
       min(resolution.x, resolution.y);

       vec2 d = morphing(p);
       vec3 color = mix(vec3(1) ,vec3(0),step(d.y,d.x));
 
   gl_FragColor = vec4(color,1.0);
}
