import { Billboard, Text } from '@react-three/drei';
import type { BuildingDef } from '@/data/buildings';

export function Placeholder({ def }: { def: BuildingDef }) {
  const [x, , z] = def.position;

  return (
    <group position={[x, 0, z]}>
      <Geometry def={def} />
      <Billboard position={[0, labelHeight(def) + 1.4, 0]}>
        <Text
          fontSize={1.1}
          color="#2a2520"
          outlineWidth={0.06}
          outlineColor="#fffaee"
          anchorX="center"
          anchorY="middle"
        >
          {def.shortLabel}
        </Text>
      </Billboard>
    </group>
  );
}

function labelHeight(def: BuildingDef): number {
  const s = def.shape;
  switch (s.kind) {
    case 'cylinder': return s.height;
    case 'box': return s.height;
    case 'twin': return s.height;
    case 'dome': return s.baseHeight + s.radius;
    case 'disc': return 0.4;
  }
}

function Geometry({ def }: { def: BuildingDef }) {
  const s = def.shape;
  switch (s.kind) {
    case 'cylinder':
      return (
        <mesh castShadow receiveShadow position={[0, s.height / 2, 0]}>
          <cylinderGeometry args={[s.radius, s.radius, s.height, 48]} />
          <meshStandardMaterial color={def.color} roughness={0.7} />
        </mesh>
      );
    case 'box':
      return (
        <mesh castShadow receiveShadow position={[0, s.height / 2, 0]}>
          <boxGeometry args={[s.width, s.height, s.depth]} />
          <meshStandardMaterial color={def.color} roughness={0.75} />
        </mesh>
      );
    case 'twin': {
      const off = (s.spacing + s.width) / 2;
      return (
        <>
          <mesh castShadow receiveShadow position={[-off, s.height / 2, 0]}>
            <boxGeometry args={[s.width, s.height, s.depth]} />
            <meshStandardMaterial color={def.color} roughness={0.55} metalness={0.2} />
          </mesh>
          <mesh castShadow receiveShadow position={[off, s.height / 2, 0]}>
            <boxGeometry args={[s.width, s.height, s.depth]} />
            <meshStandardMaterial color={def.color} roughness={0.55} metalness={0.2} />
          </mesh>
          {/* Sky bridge */}
          <mesh castShadow position={[0, s.height * 0.7, 0]}>
            <boxGeometry args={[s.spacing, 1, s.depth * 0.7]} />
            <meshStandardMaterial color={def.color} roughness={0.55} metalness={0.2} />
          </mesh>
        </>
      );
    }
    case 'dome':
      return (
        <>
          <mesh castShadow receiveShadow position={[0, s.baseHeight / 2, 0]}>
            <cylinderGeometry args={[s.radius, s.radius, s.baseHeight, 32]} />
            <meshStandardMaterial color={def.color} roughness={0.7} />
          </mesh>
          <mesh castShadow receiveShadow position={[0, s.baseHeight, 0]}>
            <sphereGeometry args={[s.radius, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color={def.color} roughness={0.4} transparent opacity={0.85} />
          </mesh>
        </>
      );
    case 'disc':
      return (
        <mesh receiveShadow position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[s.radius, 48]} />
          <meshStandardMaterial color={def.color} roughness={0.9} />
        </mesh>
      );
  }
}
