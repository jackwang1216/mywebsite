import * as THREE from 'three';

export interface MITDomeGeometry {
  foundation: THREE.EdgesGeometry;
  columns: THREE.EdgesGeometry[];
  entablature: THREE.EdgesGeometry;
  drum: THREE.EdgesGeometry;
  dome: THREE.EdgesGeometry;
  lantern: THREE.EdgesGeometry;
  crown: THREE.EdgesGeometry;
}

export const createMITDomeGeometry = (): MITDomeGeometry => {
  // Foundation/Base with higher detail
  const foundationGeometry = new THREE.BoxGeometry(3.0, 0.2, 1.8);
  const foundation = new THREE.EdgesGeometry(foundationGeometry);

  // Columns (10 columns in front) with higher resolution
  const columns: THREE.EdgesGeometry[] = [];
  const columnGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.2, 16);
  
  for (let i = 0; i < 10; i++) {
    const columnEdges = new THREE.EdgesGeometry(columnGeometry);
    columns.push(columnEdges);
  }

  // Entablature (top horizontal element above columns)
  const entablatureGeometry = new THREE.BoxGeometry(2.8, 0.15, 0.2);
  const entablature = new THREE.EdgesGeometry(entablatureGeometry);

  // Drum (cylindrical base for dome) with much higher detail
  const drumGeometry = new THREE.CylinderGeometry(1.0, 1.0, 0.3, 32);
  const drum = new THREE.EdgesGeometry(drumGeometry);

  // Main dome (hemisphere with high-resolution geodesic structure)
  const domeGeometry = new THREE.SphereGeometry(1.0, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  const dome = new THREE.EdgesGeometry(domeGeometry);

  // Lantern (small structure on top) with higher detail
  const lanternGeometry = new THREE.CylinderGeometry(0.2, 0.25, 0.3, 16);
  const lantern = new THREE.EdgesGeometry(lanternGeometry);

  // Crown (small dome on top) with higher detail
  const crownGeometry = new THREE.SphereGeometry(0.08, 12, 8);
  const crown = new THREE.EdgesGeometry(crownGeometry);

  return {
    foundation,
    columns,
    entablature,
    drum,
    dome,
    lantern,
    crown
  };
};

export const createProjectionPlatformGeometry = () => {
  // Simple platform edge only (no top/bottom faces)
  const outerRing = new THREE.TorusGeometry(2.0, 0.05, 8, 32);
  const platform = new THREE.EdgesGeometry(outerRing);

  // Minimal concentric rings
  const rings: THREE.EdgesGeometry[] = [];
  const ringRadii = [1.4, 1.7];
  
  ringRadii.forEach(radius => {
    const ringGeometry = new THREE.TorusGeometry(radius, 0.02, 6, 24);
    const ring = new THREE.EdgesGeometry(ringGeometry);
    rings.push(ring);
  });

  // Minimal center point
  const centerGeometry = new THREE.SphereGeometry(0.03, 6, 4);
  const center = new THREE.EdgesGeometry(centerGeometry);

  return {
    platform,
    rings,
    center
  };
};

export const getDomePositions = () => {
  return {
    foundation: { x: 0, y: -0.5, z: 0 },
    columns: { x: 0, y: 0.1, z: 0.8 }, // Base position for column array
    entablature: { x: 0, y: 0.7, z: 0.8 },
    drum: { x: 0, y: 0.9, z: 0 },
    dome: { x: 0, y: 1.4, z: 0 },
    lantern: { x: 0, y: 1.9, z: 0 },
    crown: { x: 0, y: 2.1, z: 0 }
  };
};

export const getColumnPositions = (count: number = 10): THREE.Vector3[] => {
  const positions: THREE.Vector3[] = [];
  const spacing = 2.4 / (count - 1); // Spread across 2.4 units
  const startX = -1.2; // Start position
  
  for (let i = 0; i < count; i++) {
    positions.push(new THREE.Vector3(startX + i * spacing, 0, 0));
  }
  
  return positions;
};

export const createWireframeLineGeometry = (points: THREE.Vector3[]): THREE.BufferGeometry => {
  const geometry = new THREE.BufferGeometry();
  const positions: number[] = [];
  
  for (let i = 0; i < points.length - 1; i++) {
    positions.push(
      points[i].x, points[i].y, points[i].z,
      points[i + 1].x, points[i + 1].y, points[i + 1].z
    );
  }
  
  // Close the loop if needed
  if (points.length > 2) {
    positions.push(
      points[points.length - 1].x, points[points.length - 1].y, points[points.length - 1].z,
      points[0].x, points[0].y, points[0].z
    );
  }
  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  return geometry;
};

// New solid geometry functions for hologram effect
export interface SolidMITDomeGeometry {
  foundation: THREE.BoxGeometry;
  columns: THREE.CylinderGeometry;
  mainBuilding: THREE.BoxGeometry;
  entablature: THREE.BoxGeometry;
  drum: THREE.CylinderGeometry;
  dome: THREE.SphereGeometry;
  lantern: THREE.CylinderGeometry;
  crown: THREE.SphereGeometry;
}

export const createSolidMITDomeGeometry = (): SolidMITDomeGeometry => {
  return {
    foundation: new THREE.BoxGeometry(3.0, 0.2, 1.8),
    columns: new THREE.CylinderGeometry(0.06, 0.06, 1.2, 12),
    mainBuilding: new THREE.BoxGeometry(2.6, 1.0, 1.5),
    entablature: new THREE.BoxGeometry(2.8, 0.15, 0.2),
    drum: new THREE.CylinderGeometry(1.0, 1.0, 0.3, 24),
    dome: new THREE.SphereGeometry(1.0, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2),
    lantern: new THREE.CylinderGeometry(0.2, 0.25, 0.3, 12),
    crown: new THREE.SphereGeometry(0.08, 8, 6)
  };
};

export const createSimplePlatformGeometry = () => {
  return {
    base: new THREE.CylinderGeometry(2.0, 2.0, 0.12, 32),
    innerRing: new THREE.TorusGeometry(1.4, 0.02, 8, 24),
    outerRing: new THREE.TorusGeometry(1.8, 0.02, 8, 24),
    center: new THREE.SphereGeometry(0.05, 8, 6)
  };
};