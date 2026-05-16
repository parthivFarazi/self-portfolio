import { useMemo } from 'react';
import { Shape, ExtrudeGeometry } from 'three';
import { Billboard, Text } from '@react-three/drei';
import type { BuildingDef } from '@/data/buildings';
import { metalSilver, metalSilverDark, glassFuturistic, lampAmber, stoneWarm, woodDark } from '../materials';

// 8-pointed star (two overlapping squares rotated 45°) at the given radius.
function starShape(radius: number): Shape {
  const s = new Shape();
  const pts: [number, number][] = [];
  // Two squares; build a single combined boundary by sampling outer-ring vertices.
  // We use 16 vertices around the circle, alternating outer (square corners) and
  // inner (square midpoints reaching out further than the perpendicular).
  // Easier approach: use 8 outer points (the star tips) at full radius and
  // 8 inner points at radius * cos(π/8) (where the squares' edges intersect).
  const inner = radius * Math.cos(Math.PI / 8);
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    const r = i % 2 === 0 ? radius : inner;
    pts.push([Math.cos(a) * r, Math.sin(a) * r]);
  }
  s.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) s.lineTo(pts[i][0], pts[i][1]);
  s.closePath();
  return s;
}

function useStarGeometry(radius: number, height: number) {
  return useMemo(() => {
    const shape = starShape(radius);
    return new ExtrudeGeometry(shape, { depth: height, bevelEnabled: false, steps: 1, curveSegments: 1 });
  }, [radius, height]);
}

function Tower({ x }: { x: number }) {
  // Stepped silhouette — total stack ~28u (was 45u). Tech Tower is ~30u, so
  // Petronas reads as the tallest on the island but stays in-frustum when the
  // player walks up to it.
  const seg1 = useStarGeometry(2.4, 10); // base
  const seg2 = useStarGeometry(2.0, 8);  // mid-low (sky-bridge level)
  const seg3 = useStarGeometry(1.7, 6);  // upper
  const seg4 = useStarGeometry(1.35, 4); // crown — total stack 10+8+6+4 = 28

  // Vertical ribs — 16 thin slats around each segment
  const ribs = (radius: number, h: number, yBase: number) =>
    Array.from({ length: 16 }).map((_, i) => {
      const a = (i / 16) * Math.PI * 2 + Math.PI / 16;
      return (
        <mesh key={`${yBase}-${i}`} position={[x + Math.cos(a) * (radius + 0.02), yBase + h / 2, Math.sin(a) * (radius + 0.02)]} rotation={[0, -a, 0]} material={metalSilverDark}>
          <boxGeometry args={[0.06, h, 0.12]} />
        </mesh>
      );
    });

  return (
    <group>
      <mesh castShadow receiveShadow geometry={seg1} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0, 0]} material={metalSilver} />
      <mesh castShadow receiveShadow geometry={seg2} rotation={[-Math.PI / 2, 0, 0]} position={[x, 10, 0]} material={metalSilver} />
      <mesh castShadow receiveShadow geometry={seg3} rotation={[-Math.PI / 2, 0, 0]} position={[x, 18, 0]} material={metalSilver} />
      <mesh castShadow receiveShadow geometry={seg4} rotation={[-Math.PI / 2, 0, 0]} position={[x, 24, 0]} material={metalSilver} />

      {/* Glass bands between steps — slight inset reads as windows wrapping */}
      <mesh position={[x, 5, 0]} material={glassFuturistic}>
        <cylinderGeometry args={[2.3, 2.3, 9, 8]} />
      </mesh>
      <mesh position={[x, 14, 0]} material={glassFuturistic}>
        <cylinderGeometry args={[1.9, 1.9, 7, 8]} />
      </mesh>
      <mesh position={[x, 21, 0]} material={glassFuturistic}>
        <cylinderGeometry args={[1.6, 1.6, 5, 8]} />
      </mesh>

      {/* Vertical ribs on the largest segment for cladding texture */}
      {ribs(2.4, 10, 0)}

      {/* Spire — shorter (~4u), starting at the crown top y=28 */}
      <mesh castShadow position={[x, 30, 0]} material={metalSilverDark}>
        <cylinderGeometry args={[0.06, 0.5, 4, 16]} />
      </mesh>
      {/* Aviation light dot atop spire */}
      <mesh position={[x, 32.2, 0]} material={lampAmber}>
        <sphereGeometry args={[0.18, 16, 12]} />
      </mesh>
    </group>
  );
}

export function PetronasTowers({ def }: { def: BuildingDef }) {
  const [px, , pz] = def.position;
  const spacing = 8; // distance between tower centers

  return (
    <group position={[px, 0, pz]}>
      {/* Stone plaza base under both towers */}
      <mesh receiveShadow position={[0, 0.2, 0]} material={stoneWarm}>
        <boxGeometry args={[spacing + 8, 0.4, 8]} />
      </mesh>

      {/* Two towers */}
      <Tower x={-spacing / 2} />
      <Tower x={spacing / 2} />

      {/* ── Sky bridge at ~60% height (16-18u) — double-decker ────────── */}
      {/* Lower deck */}
      <mesh castShadow position={[0, 16, 0]} material={metalSilver}>
        <boxGeometry args={[spacing - 0.6, 0.7, 1.6]} />
      </mesh>
      {/* Upper deck */}
      <mesh castShadow position={[0, 17.8, 0]} material={metalSilver}>
        <boxGeometry args={[spacing - 0.6, 0.7, 1.6]} />
      </mesh>
      {/* Glass walls between decks */}
      <mesh position={[0, 16.9, 0]} material={glassFuturistic}>
        <boxGeometry args={[spacing - 0.6, 1.2, 1.5]} />
      </mesh>
      {/* Diagonal support struts from base of bridge to each tower */}
      {[-1, 1].map((sign) => (
        <mesh
          key={sign}
          castShadow
          position={[sign * (spacing / 2 - 1.3), 13.5, 0]}
          rotation={[0, 0, sign * Math.PI / 6]}
          material={metalSilverDark}
        >
          <cylinderGeometry args={[0.16, 0.16, 5.6, 8]} />
        </mesh>
      ))}

      {/* ── Base plaza details — bench, globe, doormat ─────────────────── */}
      {/* Wooden bench */}
      <group position={[0, 0.6, 4]}>
        <mesh castShadow position={[0, 0.4, 0]} material={woodDark}>
          <boxGeometry args={[2.2, 0.16, 0.6]} />
        </mesh>
        <mesh castShadow position={[-0.9, 0.2, 0]} material={woodDark}>
          <boxGeometry args={[0.16, 0.4, 0.6]} />
        </mesh>
        <mesh castShadow position={[0.9, 0.2, 0]} material={woodDark}>
          <boxGeometry args={[0.16, 0.4, 0.6]} />
        </mesh>
      </group>

      {/* "PF" doormat */}
      <mesh receiveShadow position={[0, 0.41, 6]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.6, 0.9]} />
        <meshStandardMaterial color="#3a4a3e" roughness={0.95} />
      </mesh>

      {/* Globe pedestal */}
      <group position={[-3.4, 0.4, 3]}>
        <mesh castShadow position={[0, 0.5, 0]} material={woodDark}>
          <cylinderGeometry args={[0.25, 0.3, 1, 12]} />
        </mesh>
        <mesh castShadow position={[0, 1.25, 0]}>
          <sphereGeometry args={[0.45, 24, 18]} />
          <meshStandardMaterial color="#5a9598" roughness={0.6} />
        </mesh>
        {/* KL pin */}
        <mesh position={[0.35, 1.35, 0.18]} material={lampAmber}>
          <sphereGeometry args={[0.06, 12, 8]} />
        </mesh>
        {/* ATL pin */}
        <mesh position={[-0.32, 1.28, 0.22]} material={lampAmber}>
          <sphereGeometry args={[0.06, 12, 8]} />
        </mesh>
      </group>

      {/* Warm amber base lighting */}
      <pointLight position={[0, 1.5, 0]} intensity={2.2} distance={14} decay={2} color="#f5d97a" />
      <pointLight position={[-4, 1.2, 4]} intensity={1.0} distance={9} decay={2} color="#f5d97a" />
      <pointLight position={[4, 1.2, 4]} intensity={1.0} distance={9} decay={2} color="#f5d97a" />

      {/* Floating label */}
      <Billboard position={[0, 36, 0]}>
        <Text fontSize={1.4} color="#2a2520" outlineWidth={0.08} outlineColor="#fffaee" anchorX="center" anchorY="middle">
          {def.shortLabel}
        </Text>
      </Billboard>
    </group>
  );
}
