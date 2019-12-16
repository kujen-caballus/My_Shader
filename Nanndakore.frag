	
#ifdef GL_ES
precision mediump float;
#endif

 
uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;
 
void main() {
   vec2 p = (gl_FragCoord.xy * 2.0 - resolution) /
       min(resolution.x, resolution.y);


       for(float i = 1.0; i<= 4.0; ++i)
       {
          p = abs(p * 1.5) - 2.0;
          float a = time * i;
          float c = cos(a*0.5), s = sin(a*0.5);
           p *= mat2(c*2.0, s, -s, c * 2.0) ;


          
       }



   float c = cos(time), s = sin(time);
   
   p *= mat2(c, s, -s, c);

   p = abs(p * 1.5) - 1.0;
   p *= mat2(c, s, -s, c);

   vec2 axis = 1.0 - smoothstep(0.01, 0.02, abs(p));
   vec2 color = mix(p, vec2(1), axis.x + axis.y);
   gl_FragColor = vec4(color,0, 0.9);
}







