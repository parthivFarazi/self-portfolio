import { Billboard, Text } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { DoubleSide, Object3D, type Group, type InstancedMesh, type Mesh } from 'three';
import { CanvasTexture } from 'three';
import type { BuildingDef } from '@/data/buildings';
import { sand, water, stoneCool, woodDark, lampAmber } from '../materials';

// ── Falling petal cloud ────────────────────────────────────────────────
// 16 petals around the cherry tree, drawn as one InstancedMesh; per-petal
// state lives in a plain array and matrices update in a single useFrame.
const PETAL_COUNT = 16;

interface PetalState {
  x: number;
  z: number;
  y: number;
  fallSpeed: number;
  driftX: number;
  driftZ: number;
  rotZ: number;
  spinSpeed: number;
}

function makePetalState(seed: number): PetalState {
  const r = (n: number) => Math.sin(seed * 11.3 + n * 7.7) * 0.5 + 0.5;
  return {
    x: (r(1) - 0.5) * 3.5,
    z: (r(2) - 0.5) * 3.5,
    y: 3.0 + r(3) * 2.5,
    fallSpeed: 0.22 + r(4) * 0.25,
    driftX: (r(5) - 0.5) * 0.18,
    driftZ: (r(6) - 0.5) * 0.18,
    rotZ: r(7) * Math.PI * 2,
    spinSpeed: (r(8) - 0.5) * 1.6,
  };
}

function PetalCloud({ origin }: { origin: [number, number, number] }) {
  const ref = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const petals = useMemo<PetalState[]>(
    () => Array.from({ length: PETAL_COUNT }, (_, i) => makePetalState(i)),
    [],
  );

  useFrame((_state, dt) => {
    if (!ref.current) return;
    const delta = Math.min(dt, 0.05);
    for (let i = 0; i < petals.length; i++) {
      const p = petals[i];
      p.y -= p.fallSpeed * delta;
      p.x += p.driftX * delta;
      p.z += p.driftZ * delta;
      p.rotZ += p.spinSpeed * delta;
      if (p.y < 0.1) {
        const fresh = makePetalState(i + Math.floor(Math.random() * 1000));
        Object.assign(p, fresh);
        p.y = 4 + Math.random() * 1.5;
      }
      dummy.position.set(origin[0] + p.x, origin[1] + p.y, origin[2] + p.z);
      dummy.rotation.set(0, 0, p.rotZ);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, PETAL_COUNT]} frustumCulled={false}>
      <planeGeometry args={[0.18, 0.12]} />
      <meshBasicMaterial color="#f5b6da" transparent opacity={0.85} side={DoubleSide} fog={false} />
    </instancedMesh>
  );
}

function Koi({ seed, color, r = 0.55 }: { seed: number; color: string; r?: number }) {
  const g = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (!g.current) return;
    const t = clock.getElapsedTime() * 0.35 + seed;
    g.current.position.x = Math.cos(t) * r;
    g.current.position.z = Math.sin(t) * r;
    // Vertical tail wiggle
    g.current.position.y = 0.1 + Math.sin(t * 4) * 0.005;
    g.current.rotation.y = -t - Math.PI / 2;
  });
  return (
    <group ref={g}>
      {/* Body — elongated ellipsoid, sized so it reads from a few units away */}
      <mesh scale={[0.5, 0.08, 0.22]}>
        <sphereGeometry args={[1, 14, 10]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} roughness={0.4} />
      </mesh>
      {/* Tail fin */}
      <mesh position={[-0.46, 0, 0]} scale={[0.18, 0.06, 0.16]}>
        <sphereGeometry args={[1, 10, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} roughness={0.5} />
      </mesh>
      {/* Side fins */}
      <mesh position={[0.05, 0, 0.18]} scale={[0.1, 0.04, 0.12]} rotation={[0, 0.6, 0]}>
        <sphereGeometry args={[1, 8, 6]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} roughness={0.5} />
      </mesh>
      <mesh position={[0.05, 0, -0.18]} scale={[0.1, 0.04, 0.12]} rotation={[0, -0.6, 0]}>
        <sphereGeometry args={[1, 8, 6]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} roughness={0.5} />
      </mesh>
    </group>
  );
}

// Sand with raked concentric ring patterns — dark, visible from camera angle.
function makeRakedSandTexture() {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 512;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#e8d5a8';
  ctx.fillRect(0, 0, c.width, c.height);
  // Concentric rings — readable. Multiple passes for a raked-furrow look:
  // a soft outer band (shadow) + a sharp inner dark line + a tiny highlight.
  const cx = c.width / 2;
  const cy = c.height / 2;
  for (let r = 16; r < c.width / 2; r += 18) {
    // Soft wider shadow band
    ctx.strokeStyle = 'rgba(120, 95, 50, 0.18)';
    ctx.lineWidth = 5.5;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
    // Sharp dark furrow line
    ctx.strokeStyle = '#8a6a3a';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
    // Tiny lighter highlight just inside the furrow
    ctx.strokeStyle = 'rgba(255, 240, 200, 0.45)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.arc(cx, cy, r - 1.6, 0, Math.PI * 2);
    ctx.stroke();
  }
  // Sand specks
  for (let i = 0; i < 600; i++) {
    ctx.fillStyle = `rgba(160, 130, 80, ${0.06 + Math.random() * 0.1})`;
    ctx.fillRect(Math.random() * c.width, Math.random() * c.height, 1.5, 1.5);
  }
  return new CanvasTexture(c);
}

export function ZenGarden({ def }: { def: BuildingDef }) {
  const [px, , pz] = def.position;
  const R = 5;
  const sandTex = useMemo(makeRakedSandTexture, []);

  const sandMat = useMemo(() => {
    const m = sand.clone();
    m.map = sandTex;
    return m;
  }, [sandTex]);

  // Pond surface ripple — gentle vertical bob on the water disc so it doesn't
  // read as a solid painted shape.
  const pondSurface = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (!pondSurface.current) return;
    const t = clock.getElapsedTime();
    pondSurface.current.position.y = 0.07 + Math.sin(t * 1.6) * 0.012;
    // Subtle XY scale wobble simulates a slow ripple
    const s = 1 + Math.sin(t * 0.9) * 0.012;
    pondSurface.current.scale.set(s, s, 1);
  });

  return (
    <group position={[px, 0, pz]}>
      {/* Sand circle */}
      <mesh receiveShadow position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} material={sandMat}>
        <circleGeometry args={[R, 48]} />
      </mesh>

      {/* Stone border ring */}
      <mesh receiveShadow position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[R, R + 0.4, 48]} />
        <meshStandardMaterial color="#8a8275" roughness={0.95} />
      </mesh>

      {/* Koi pond — to one side */}
      <group position={[-R + 1.4, 0, R - 1.4]}>
        {/* Water surface — animated bob + scale wobble gives ripple read */}
        <mesh ref={pondSurface} receiveShadow position={[0, 0.07, 0]} rotation={[-Math.PI / 2, 0, 0]} material={water}>
          <circleGeometry args={[1.1, 32]} />
        </mesh>
        {/* Stone rim around pond */}
        <mesh receiveShadow position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.1, 1.3, 32]} />
          <meshStandardMaterial color="#6a6058" roughness={0.95} />
        </mesh>
        {/* Three koi fish swimming at different radii */}
        <Koi seed={0} color="#f57228" r={0.55} />
        <Koi seed={2.5} color="#ffd97a" r={0.35} />
        <Koi seed={4.5} color="#fffaee" r={0.7} />
        {/* Lily pad */}
        <mesh position={[0.5, 0.085, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.18, 16]} />
          <meshStandardMaterial color="#4a8a48" roughness={0.85} />
        </mesh>
        <mesh position={[-0.4, 0.085, -0.4]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.14, 16]} />
          <meshStandardMaterial color="#5fa854" roughness={0.85} />
        </mesh>
        {/* Tiny stone bridge */}
        <mesh castShadow position={[0, 0.18, 0]} material={stoneCool}>
          <boxGeometry args={[2.4, 0.1, 0.4]} />
        </mesh>
      </group>

      {/* Cherry tree at edge */}
      <group position={[R - 1.6, 0, -R + 1.6]}>
        <mesh castShadow position={[0, 1.4, 0]} material={woodDark}>
          <cylinderGeometry args={[0.18, 0.24, 2.8, 8]} />
        </mesh>
        {/* Foliage cloud */}
        <mesh castShadow position={[0, 3.1, 0]}>
          <sphereGeometry args={[1.4, 16, 12]} />
          <meshStandardMaterial color="#f5b6da" roughness={0.85} emissive="#e07ec3" emissiveIntensity={0.18} />
        </mesh>
        <mesh castShadow position={[0.6, 3.4, 0.5]}>
          <sphereGeometry args={[0.9, 16, 12]} />
          <meshStandardMaterial color="#f5b6da" roughness={0.85} />
        </mesh>
        <mesh castShadow position={[-0.7, 3.0, -0.3]}>
          <sphereGeometry args={[0.8, 16, 12]} />
          <meshStandardMaterial color="#f5b6da" roughness={0.85} />
        </mesh>
      </group>

      {/* Stone bench in the center-front */}
      <group position={[0, 0.25, R - 1.8]}>
        <mesh castShadow material={stoneCool}>
          <boxGeometry args={[1.8, 0.18, 0.5]} />
        </mesh>
        <mesh castShadow material={stoneCool} position={[-0.7, -0.15, 0]}>
          <boxGeometry args={[0.18, 0.25, 0.5]} />
        </mesh>
        <mesh castShadow material={stoneCool} position={[0.7, -0.15, 0]}>
          <boxGeometry args={[0.18, 0.25, 0.5]} />
        </mesh>
        {/* Glowing journal on the bench */}
        <group position={[0, 0.12, 0]}>
          <mesh material={lampAmber}>
            <boxGeometry args={[0.5, 0.04, 0.35]} />
          </mesh>
          <mesh position={[0, 0.04, 0]}>
            <boxGeometry args={[0.46, 0.02, 0.32]} />
            <meshStandardMaterial color="#fffaee" emissive="#f5d97a" emissiveIntensity={0.4} roughness={0.5} />
          </mesh>
        </group>
      </group>

      {/* 2 stone lanterns on perimeter — emissive + bloom, no point lights */}
      {[[-R + 0.6, R - 0.6], [R - 0.6, -R + 0.6]].map(([lx, lz], i) => (
        <group key={i} position={[lx, 0.05, lz]}>
          <mesh castShadow material={stoneCool} position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.16, 0.2, 0.6, 6]} />
          </mesh>
          <mesh position={[0, 0.7, 0]} material={lampAmber}>
            <boxGeometry args={[0.32, 0.32, 0.32]} />
          </mesh>
          <mesh material={stoneCool} position={[0, 0.95, 0]}>
            <cylinderGeometry args={[0.22, 0.16, 0.18, 6]} />
          </mesh>
        </group>
      ))}

      {/* Falling petal cloud — origin sits under the cherry tree canopy */}
      <PetalCloud origin={[R - 1.6, 0, -R + 1.6]} />

      <Billboard position={[0, 5, 0]}>
        <Text fontSize={0.95} color="#2a2520" outlineWidth={0.06} outlineColor="#fffaee" anchorX="center" anchorY="middle">
          {def.shortLabel}
        </Text>
      </Billboard>
    </group>
  );
}

