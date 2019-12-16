
#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 resolution;

void main( void ) {

vec2 uv = ( gl_FragCoord.xy / resolution.y );

vec3 c = vec3(fract(sin(dot(floor(uv.xy*32.0+vec2(0.0,time*2.0)),vec2(5.364,6.357)))*357.536));

gl_FragColor = vec4( fract(c.x+time),fract(c.y+1.0 / time),0.0, 2.0 );

}