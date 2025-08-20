import * as THREE from 'three';

export const createVolumetricLightMaterial = () => {
  return new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      lightColor: { value: new THREE.Color(0x00DDFF) },
      intensity: { value: 1.5 },
      opacity: { value: 0.4 },
      noiseScale: { value: 0.5 },
      rayHeight: { value: 4.0 }
    },
    vertexShader: `
      uniform float time;
      varying vec3 vWorldPosition;
      varying vec3 vLocalPosition;
      varying float vDistance;
      
      void main() {
        vLocalPosition = position;
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        
        // Calculate distance from center for falloff
        vDistance = length(position.xz);
        
        gl_Position = projectionMatrix * viewMatrix * worldPosition;
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 lightColor;
      uniform float intensity;
      uniform float opacity;
      uniform float noiseScale;
      uniform float rayHeight;
      
      varying vec3 vWorldPosition;
      varying vec3 vLocalPosition;
      varying float vDistance;
      
      // Simple noise function
      float noise(vec3 p) {
        return sin(p.x * 4.0 + time) * sin(p.y * 3.0 + time * 0.7) * sin(p.z * 5.0 + time * 0.5);
      }
      
      void main() {
        // Height-based opacity falloff
        float heightFalloff = 1.0 - (vLocalPosition.y / rayHeight);
        heightFalloff = smoothstep(0.0, 1.0, heightFalloff);
        
        // Distance-based opacity falloff
        float distanceFalloff = 1.0 - smoothstep(0.0, 1.0, vDistance);
        
        // Animated noise for internal movement
        vec3 noisePos = vWorldPosition * noiseScale + vec3(0.0, time * 2.0, 0.0);
        float noiseValue = noise(noisePos) * 0.3 + 0.7;
        
        // Pulse effect
        float pulse = sin(time * 2.0) * 0.2 + 0.8;
        
        // Combine effects
        float alpha = heightFalloff * distanceFalloff * noiseValue * pulse * opacity;
        
        vec3 color = lightColor * intensity;
        
        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide
  });
};

export const createLightBeamGeometry = (radius: number = 1.0, height: number = 4.0, segments: number = 16) => {
  const geometry = new THREE.ConeGeometry(0.1, height, segments);
  
  // Modify geometry to create a hollow cone
  const positions = geometry.attributes.position.array as Float32Array;
  const newPositions: number[] = [];
  
  // Create hollow cone by duplicating vertices and creating inner surface
  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i];
    const y = positions[i + 1];
    const z = positions[i + 2];
    
    // Outer surface
    newPositions.push(x, y, z);
    
    // Inner surface (slightly smaller)
    const scale = 0.8;
    newPositions.push(x * scale, y, z * scale);
  }
  
  const hollowGeometry = new THREE.BufferGeometry();
  hollowGeometry.setAttribute('position', new THREE.Float32BufferAttribute(newPositions, 3));
  
  return hollowGeometry;
};