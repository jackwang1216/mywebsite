import * as THREE from 'three';

export const createEnhancedVolumetricMaterial = () => {
  return new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      lightColor: { value: new THREE.Color(0x00DDFF) },
      intensity: { value: 2.5 },
      opacity: { value: 0.6 },
      raySpeed: { value: 2.0 },
      convergence: { value: 0.8 }
    },
    vertexShader: `
      varying vec3 vWorldPosition;
      varying vec3 vLocalPosition;
      varying float vDistanceFromCenter;
      varying float vHeight;
      
      void main() {
        vLocalPosition = position;
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        
        // Calculate distance from center axis
        vDistanceFromCenter = length(position.xz);
        
        // Height factor (0 at bottom, 1 at top)
        vHeight = (position.y + 2.25) / 4.5; // Normalized height
        
        gl_Position = projectionMatrix * viewMatrix * worldPosition;
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 lightColor;
      uniform float intensity;
      uniform float opacity;
      uniform float raySpeed;
      uniform float convergence;
      
      varying vec3 vWorldPosition;
      varying vec3 vLocalPosition;
      varying float vDistanceFromCenter;
      varying float vHeight;
      
      // Simple noise function
      float noise(vec3 p) {
        return sin(p.x * 4.0) * sin(p.y * 3.0) * sin(p.z * 5.0);
      }
      
      void main() {
        // Height-based convergence effect
        float convergenceFactor = mix(1.0, convergence, vHeight);
        
        // Distance-based opacity falloff
        float distanceFalloff = 1.0 - smoothstep(0.0, 1.0, vDistanceFromCenter * convergenceFactor);
        
        // Upward moving rays effect
        float rayPattern = sin((vHeight * 10.0 - time * raySpeed) * 3.14159);
        rayPattern = smoothstep(-0.5, 0.5, rayPattern) * 0.5;
        
        // Core beam intensity
        float coreBeam = exp(-vDistanceFromCenter * 3.0) * 2.0;
        
        // Animated noise for organic feel
        vec3 noisePos = vWorldPosition * 0.5 + vec3(0.0, time * 1.0, 0.0);
        float noiseValue = noise(noisePos) * 0.1 + 0.9;
        
        // Pulsing effect
        float pulse = sin(time * 3.0) * 0.2 + 0.8;
        
        // Combine all effects
        float finalIntensity = (distanceFalloff + coreBeam + rayPattern) * noiseValue * pulse * intensity;
        float alpha = finalIntensity * opacity * (0.3 + vHeight * 0.7);
        
        vec3 color = lightColor * finalIntensity;
        
        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide
  });
};

export const createLightRayMaterial = () => {
  return new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color(0x00BBFF) },
      intensity: { value: 1.5 },
      speed: { value: 3.0 }
    },
    vertexShader: `
      varying vec2 vUv;
      varying float vProgress;
      
      void main() {
        vUv = uv;
        vProgress = position.y / 4.5 + 0.5; // Normalized progress from bottom to top
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color;
      uniform float intensity;
      uniform float speed;
      
      varying vec2 vUv;
      varying float vProgress;
      
      void main() {
        // Moving light pattern
        float movingPattern = sin((vProgress * 10.0 - time * speed) * 3.14159);
        movingPattern = smoothstep(0.0, 1.0, movingPattern + 0.5);
        
        // Edge fade
        float edgeFade = 1.0 - abs(vUv.x - 0.5) * 2.0;
        edgeFade = smoothstep(0.0, 1.0, edgeFade);
        
        float alpha = movingPattern * edgeFade * intensity * 0.8;
        
        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
};