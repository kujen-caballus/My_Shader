#ifdef GL_ES
precision mediump float;
#endif


uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

vec2 repeat(vec2 p, float interval) {
    return mod(p, interval) - interval * 0.5;
}

float dist(vec2 p, float interval, float width) {
    return length(max(abs(repeat(p, interval)) - width, 0.0));
}

float sceneDist(vec3 p) {
    float bar_x = dist(p.yz, 0.5, 0.03);
    float bar_y = dist(p.xz, 0.5, 0.02);
    float bar_z = dist(p.xy, 0.5, 0.02);

    return min(min(bar_x, bar_y), bar_z);
}

void main( void ) {
    vec2 p = ( gl_FragCoord.xy * 2. - resolution.xy ) / min(resolution.x, resolution.y);


    vec3 cameraPos = vec3(1.0, 0,  time);
    float screenZ =  3.0;
    vec3 rayDirection = normalize(vec3(p, screenZ));

    float depth = 0.0;
    vec3 col = vec3(0.9);

    for (int i = 0; i < 99; i++) {
        vec3 rayPos = cross( cameraPos, rayDirection) + (rayDirection *depth);
        float dist = sceneDist(rayPos);

        if (dist < 0.0001) {
            col = vec3(1.0, 0.0, 0.0) * (1.0 - float(i) / 100.0);
            break;
        }

        depth += dist;
    }

    gl_FragColor = vec4(col, 1.0);
}


