import { Text3D, Billboard, Text } from '@react-three/drei';
import type { BuildingDef } from '@/data/buildings';
import { woodLight, woodDark, brickRed, tinted } from '../materials';
import { useMemo } from 'react';
import { Shape, ExtrudeGeometry } from 'three';

const FONT_URL = '/fonts/helvetiker_regular.typeface.json';

export function DeltaUpsilon({ def }: { def: BuildingDef }) {
  const [px, , pz] = def.position;
  const W = 10;
  const D = 7;
  const H = 6;
  const roofPeak = 2.6;
  const porchD = 2.8;

  const wallMat = useMemo(() => tinted(woodLight, '#f4ecd9'), []);
  const trimMat = useMemo(() => tinted(woodLight, '#fffaf0'), []);
  const slateMat = useMemo(() => tinted(woodLight, '#3a4858'), []);
  const greekLetterMat = useMemo(() => tinted(woodLight, '#1a3458'), []);

  // Gable roof: triangle in XY plane, extruded along Z so the gable runs
  // front-to-back. The +Z (front) face shows the triangular pediment.
  const roofGeo = useMemo(() => {
    const s = new Shape();
    const halfW = W / 2 + 0.3;
    s.moveTo(-halfW, 0);
    s.lineTo(halfW, 0);
    s.lineTo(0, roofPeak);
    s.closePath();
    // Roof depth extends past the porch
    return new ExtrudeGeometry(s, { depth: D + porchD + 0.6, bevelEnabled: false });
  }, []);

  const pedimentGeo = useMemo(() => {
    const s = new Shape();
    const halfW = W / 2 + 0.3;
    s.moveTo(-halfW, 0);
    s.lineTo(halfW, 0);
    s.lineTo(0, roofPeak);
    s.closePath();
    // Thin triangular plate — the pediment face on the porch end
    return new ExtrudeGeometry(s, { depth: 0.1, bevelEnabled: false });
  }, []);

  return (
    <group position={[px, 0, pz]}>
      {/* Brick foundation step */}
      <mesh receiveShadow position={[0, 0.3, 0]} material={brickRed}>
        <boxGeometry args={[W + 0.4, 0.6, D + 0.4]} />
      </mesh>

      {/* Main body — white painted wood */}
      <mesh castShadow receiveShadow position={[0, 0.6 + H / 2, 0]} material={wallMat}>
        <boxGeometry args={[W, H, D]} />
      </mesh>

      {/* Front porch floor */}
      <mesh receiveShadow position={[0, 0.6 + 0.05, D / 2 + 1.4]} material={woodDark}>
        <boxGeometry args={[W - 0.6, 0.1, 2.8]} />
      </mesh>

      {/* Four white columns across the front porch.
          Group sits on the porch-floor top (world y 0.7); the shaft is
          sized so the capital meets the cornice underside (world y 6.5) —
          base seated on the floor, capital into the entablature, no float. */}
      {[-3.2, -1.05, 1.05, 3.2].map((cx, i) => (
        <group key={i} position={[cx, 0.7, D / 2 + 2.6]}>
          {/* Column base — seated on the porch floor */}
          <mesh castShadow material={trimMat} position={[0, 0.15, 0]}>
            <boxGeometry args={[0.55, 0.3, 0.55]} />
          </mesh>
          {/* Fluted column shaft — base top (0.3) → capital bottom (5.6) */}
          <mesh castShadow material={trimMat} position={[0, 2.95, 0]}>
            <cylinderGeometry args={[0.22, 0.24, 5.3, 16]} />
          </mesh>
          {/* Capital — top meets the cornice underside */}
          <mesh castShadow material={trimMat} position={[0, 5.7, 0]}>
            <boxGeometry args={[0.45, 0.2, 0.45]} />
          </mesh>
        </group>
      ))}

      {/* Cornice strip above the porch (under the pediment) */}
      <mesh castShadow position={[0, 0.6 + H + 0.1, D / 2 + porchD / 2]} material={trimMat}>
        <boxGeometry args={[W + 0.3, 0.4, porchD + 0.4]} />
      </mesh>

      {/* Slate gable roof — covers main body + porch */}
      <mesh
        castShadow
        receiveShadow
        geometry={roofGeo}
        material={slateMat}
        position={[0, 0.6 + H + 0.3, -D / 2 - 0.3]}
      />

      {/* Pediment trim plate on the front face — the visible triangle */}
      <mesh
        castShadow
        geometry={pedimentGeo}
        material={trimMat}
        position={[0, 0.6 + H + 0.3, D / 2 + porchD + 0.31]}
      />

      {/* ΔΥ letters on the pediment — extruded, dark blue */}
      <group position={[0, 0.6 + H + 1.3, D / 2 + porchD + 0.42]}>
        <Text3D
          font={FONT_URL}
          size={0.9}
          height={0.18}
          bevelEnabled
          bevelSize={0.02}
          bevelThickness={0.04}
          letterSpacing={0.06}
          castShadow
          position={[-1.05, -0.35, 0]}
        >
          DU
          <primitive object={greekLetterMat} attach="material" />
        </Text3D>
      </group>

      {/* Main double doors */}
      <mesh position={[0, 0.6 + 1.6, D / 2 + 0.05]} material={woodDark}>
        <boxGeometry args={[1.8, 3.2, 0.1]} />
      </mesh>
      <mesh position={[-0.05, 0.6 + 1.6, D / 2 + 0.11]} material={woodDark}>
        <boxGeometry args={[0.05, 3.2, 0.05]} />
      </mesh>

      {/* Upper-floor windows — 6 across */}
      {[-3.6, -2.2, -0.7, 0.7, 2.2, 3.6].map((wx, i) => (
        <mesh key={i} position={[wx, 0.6 + 4.5, D / 2 + 0.05]}>
          <boxGeometry args={[0.7, 1.1, 0.05]} />
          <meshStandardMaterial color="#1a2832" emissive="#1f3344" emissiveIntensity={0.3} roughness={0.4} />
        </mesh>
      ))}

      {/* Solo cups on porch railing — three red cups */}
      {[-2.2, 0, 2.2].map((cx, i) => (
        <mesh key={i} castShadow position={[cx, 0.6 + 0.45, D / 2 + 1.2]}>
          <cylinderGeometry args={[0.13, 0.16, 0.3, 12]} />
          <meshStandardMaterial color="#c33829" roughness={0.55} />
        </mesh>
      ))}

      {/* Welcome doormat */}
      <mesh receiveShadow position={[0, 0.61, D / 2 + 0.6]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.4, 0.6]} />
        <meshStandardMaterial color="#3a4858" roughness={0.9} />
      </mesh>

      {/* Small baseball diamond on the front lawn — patch of dirt + lighter grass */}
      <mesh receiveShadow position={[0, 0.04, D / 2 + 7]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2, 32]} />
        <meshStandardMaterial color="#a87856" roughness={0.95} />
      </mesh>
      <mesh receiveShadow position={[0, 0.045, D / 2 + 7]} rotation={[-Math.PI / 2, 0, Math.PI / 4]}>
        <planeGeometry args={[2.6, 0.08]} />
        <meshStandardMaterial color="#fffaee" roughness={0.9} />
      </mesh>

      <Billboard position={[0, H + 5, 0]}>
        <Text fontSize={1} color="#2a2520" outlineWidth={0.06} outlineColor="#fffaee" anchorX="center" anchorY="middle">
          {def.shortLabel}
        </Text>
      </Billboard>
    </group>
  );
}
