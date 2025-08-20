import * as THREE from 'three';

export const createHologramLineMaterial = (intensity: number = 1.0) => {
  return new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      glowIntensity: { value: intensity },
      glowColor: { value: new THREE.Color(0x00FFFF) },
      pulseSpeed: { value: 1.5 },
      lineWidth: { value: 2.0 },
      opacity: { value: 0.9 }
    },
    vertexShader: `
      uniform float time;
      uniform float pulseSpeed;
      
      void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        
        // Add subtle vertex animation for "hologram instability"
        float noise = sin(position.x * 10.0 + time * pulseSpeed) * 0.001;
        gl_Position.x += noise;
        gl_Position.y += sin(position.y * 8.0 + time * pulseSpeed * 0.7) * 0.001;
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform float glowIntensity;
      uniform vec3 glowColor;
      uniform float pulseSpeed;
      uniform float opacity;
      
      void main() {
        // Pulse effect
        float pulse = sin(time * pulseSpeed) * 0.3 + 0.7;
        
        // Scanline effect
        float scanline = sin(gl_FragCoord.y * 0.1 + time * 2.0) * 0.04 + 0.96;
        
        // Hologram flicker
        float flicker = sin(time * 15.0) * 0.02 + 0.98;
        
        vec3 color = glowColor * glowIntensity * pulse * scanline * flicker;
        
        gl_FragColor = vec4(color, opacity);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide
  });
};

export const createGlowLineMaterial = (color: number = 0x00FFFF, intensity: number = 1.0) => {
  return new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color(color) },
      intensity: { value: intensity },
      opacity: { value: 0.8 }
    },
    vertexShader: `
      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color;
      uniform float intensity;
      uniform float opacity;
      
      void main() {
        float pulse = sin(time * 1.2) * 0.2 + 0.8;
        vec3 finalColor = color * intensity * pulse;
        gl_FragColor = vec4(finalColor, opacity);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
};