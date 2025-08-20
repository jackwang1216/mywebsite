import * as THREE from 'three';

export const createSolidHologramMaterial = (color: number = 0x00AAFF, intensity: number = 1.0) => {
  return new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color(color) },
      intensity: { value: intensity },
      glowStrength: { value: 2.0 },
      opacity: { value: 0.7 },
      edgeGlow: { value: 1.5 }
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      varying vec3 vViewPosition;
      
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color;
      uniform float intensity;
      uniform float glowStrength;
      uniform float opacity;
      uniform float edgeGlow;
      
      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      varying vec3 vViewPosition;
      
      void main() {
        vec3 viewDirection = normalize(-vViewPosition);
        vec3 normal = normalize(vNormal);
        
        // Fresnel effect for edge glow
        float fresnel = 1.0 - abs(dot(viewDirection, normal));
        fresnel = pow(fresnel, 2.0);
        
        // Base surface glow
        float baseGlow = 0.3 + fresnel * edgeGlow;
        
        // Subtle pulse animation
        float pulse = sin(time * 1.5) * 0.1 + 0.9;
        
        // Hologram scanlines effect
        float scanlines = sin(vWorldPosition.y * 50.0 + time * 2.0) * 0.03 + 0.97;
        
        // Final color calculation
        vec3 finalColor = color * intensity * baseGlow * pulse * scanlines;
        float alpha = opacity * (0.4 + fresnel * 0.6);
        
        gl_FragColor = vec4(finalColor, alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false
  });
};

export const createHologramEdgeMaterial = (color: number = 0x00FFFF, intensity: number = 2.0) => {
  return new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color(color) },
      intensity: { value: intensity },
      thickness: { value: 0.02 }
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
      
      void main() {
        float pulse = sin(time * 2.0) * 0.3 + 0.7;
        vec3 finalColor = color * intensity * pulse;
        gl_FragColor = vec4(finalColor, 0.9);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
};