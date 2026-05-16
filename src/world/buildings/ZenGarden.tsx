import { Billboard, Text } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { CanvasTexture, type Group } from 'three';
import type { BuildingDef } from '@/data/buildings';
import { sand, water, stoneCool, woodDark, lampAmber } from '../materials';

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

// Sand with raked concentric ring patterns
function makeRakedSandTexture() {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 512;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#e8d5a8';
  ctx.fillRect(0, 0, c.width, c.height);
  // Concentric rings — softer
  const cx = c.width / 2;
  const cy = c.height / 2;
  ctx.strokeStyle = '#c8b585';
  ctx.lineWidth = 1.4;
  for (let r = 14; r < c.width / 2; r += 14) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
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
        <mesh receiveShadow position={[0, 0.07, 0]} rotation={[-Math.PI / 2, 0, 0]} material={water}>
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

      <Billboard position={[0, 5, 0]}>
        <Text fontSize={0.95} color="#2a2520" outlineWidth={0.06} outlineColor="#fffaee" anchorX="center" anchorY="middle">
          {def.shortLabel}
        </Text>
      </Billboard>
    </group>
  );
}
