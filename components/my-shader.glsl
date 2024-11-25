uniform float uAmplitude;
uniform float uSpeed;
uniform float uProgress;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
varying vec2 vUv;

void main() {
    // Use UV coordinates to map the gradient
    vec2 uv = vUv;

    // Adjust UVs with amplitude and progress
    uv.y += sin(uv.x * 10.0 + uProgress) * uAmplitude;

    // Create gradient colors based on UV coordinates
    vec3 color = mix(uColor1, uColor2, uv.y);
    color = mix(color, uColor3, smoothstep(0.5, 1.0, uv.y));

    gl_FragColor = vec4(color, 1.0);
}
