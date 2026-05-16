import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshStandardMaterial, type Group } from 'three';

// Far-away floating islands that carry building silhouettes — "if you look
// closely" moments. NOT walkable. Pure visual. Slow vertical bob.

const BOB_FREQ = 0.1;       // Hz
const BOB_AMPLITUDE = 0.5;  // ±0.5 units

// Single-color silhouette material — slightly emissive so the shape reads
// against the bright sky instead of disappearing into shadow. The warm tint
// fakes a rim-lit golden-hour glow without needing a custom shader.
function silhouetteMaterial(): MeshStandardMaterial {
  // fog: false so the silhouette stays crisp against the sky instead of
  // melting into the horizon haze. Slight warm emissive fakes a rim-lit
  // golden-hour glow.
  return new MeshStandardMaterial({
    color: '#4a3a4f',
    roughness: 0.95,
    emissive: '#e89a52',
    emissiveIntensity: 0.22,
    fog: false,
  });
}

interface DistantIslandProps {
  position: [number, number, number];
  kind: 'tech' | 'petronas';
  seed?: number;
}

export function DistantIsland({ position, kind, seed = 0 }: DistantIslandProps) {
  const ref = useRef<Group>(null);
  const mat = useMemo(silhouetteMaterial, []);
  const rockMat = useMemo(
    () =>
      new MeshStandardMaterial({
        color: '#3a2e3a',
        roughness: 1,
        emissive: '#c97e58',
        emissiveIntensity: 0.15,
        fog: false,
      }),
    [],
  );

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const phase = seed * 1.7;
    ref.current.position.y =
      position[1] + Math.sin(t * BOB_FREQ * 2 * Math.PI + phase) * BOB_AMPLITUDE;
  });

  return (
    <group ref={ref} position={position}>
      {/* Floating rock base — flat disc top, tapered conical bottom */}
      <mesh material={rockMat} position={[0, 0, 0]}>
        <cylinderGeometry args={[3.5, 2.8, 1.4, 12]} />
      </mesh>
      <mesh material={rockMat} position={[0, -1.5, 0]}>
        <coneGeometry args={[2.8, 2.4, 10]} />
      </mesh>

      {kind === 'tech' ? <TechTowerSilhouette mat={mat} /> : <PetronasSilhouette mat={mat} />}
    </group>
  );
}

// Recognizable Tech Tower: stout brick tower with peaked roof + 4 corner
// pinnacles + central finial. Single color, low detail.
function TechTowerSilhouette({ mat }: { mat: MeshStandardMaterial }) {
  const h = 5.5;
  return (
    <group position={[0, 0.7, 0]}>
      {/* Main shaft */}
      <mesh material={mat} position={[0, h / 2, 0]}>
        <boxGeometry args={[1.4, h, 1.4]} />
      </mesh>
      {/* Crenellated parapet ring */}
      <mesh material={mat} position={[0, h + 0.2, 0]}>
        <boxGeometry args={[1.7, 0.4, 1.7]} />
      </mesh>
      {/* Steep peaked roof */}
      <mesh material={mat} position={[0, h + 1.0, 0]}>
        <coneGeometry args={[1.05, 1.3, 4]} />
      </mesh>
      {/* Corner pinnacles */}
      {[
        [-0.7, 0.7],
        [0.7, 0.7],
        [-0.7, -0.7],
        [0.7, -0.7],
      ].map(([x, z], i) => (
        <mesh key={i} material={mat} position={[x, h + 0.45, z]}>
          <coneGeometry args={[0.15, 0.55, 4]} />
        </mesh>
      ))}
      {/* Central finial */}
      <mesh material={mat} position={[0, h + 1.85, 0]}>
        <coneGeometry args={[0.1, 0.4, 6]} />
      </mesh>
    </group>
  );
}

// Recognizable Petronas: two tapered shafts with stepped setbacks at
// roughly 2/3 height, finished with thin spires. Sky bridge connecting them.
function PetronasSilhouette({ mat }: { mat: MeshStandardMaterial }) {
  const towerH = 6.5;
  const setback = towerH * 0.62;
  const spacing = 1.4;
  const Tower = ({ x }: { x: number }) => (
    <group position={[x, 0.7, 0]}>
      {/* Lower shaft (wider) */}
      <mesh material={mat} position={[0, setback / 2, 0]}>
        <cylinderGeometry args={[0.42, 0.46, setback, 12]} />
      </mesh>
      {/* Upper shaft (narrower setback) */}
      <mesh material={mat} position={[0, setback + (towerH - setback) / 2, 0]}>
        <cylinderGeometry args={[0.32, 0.36, towerH - setback, 12]} />
      </mesh>
      {/* Pinnacle top */}
      <mesh material={mat} position={[0, towerH + 0.35, 0]}>
        <cylinderGeometry args={[0.06, 0.16, 0.7, 8]} />
      </mesh>
      {/* Spire */}
      <mesh material={mat} position={[0, towerH + 1.0, 0]}>
        <coneGeometry args={[0.06, 0.6, 6]} />
      </mesh>
    </group>
  );
  return (
    <group>
      <Tower x={-spacing / 2} />
      <Tower x={spacing / 2} />
      {/* Sky bridge connecting the towers at ~mid-height */}
      <mesh material={mat} position={[0, 0.7 + setback - 0.1, 0]}>
        <boxGeometry args={[spacing, 0.25, 0.35]} />
      </mesh>
    </group>
  );
}
