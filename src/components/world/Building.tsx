import { Billboard, Text } from '@react-three/drei';
import type { BuildingDef } from '@/constants/buildings';

export function Building({ def }: { def: BuildingDef }) {
  const [x, , z] = def.position;
  const [w, d] = def.footprint;

  return (
    <group position={[x, 0, z]}>
      {def.shape === 'cylinder' ? (
        <mesh castShadow receiveShadow position={[0, def.height / 2, 0]}>
          <cylinderGeometry args={[Math.max(w, d) / 2, Math.max(w, d) / 2, def.height, 48]} />
          <meshStandardMaterial color={def.color} roughness={0.7} />
        </mesh>
      ) : (
        <mesh castShadow receiveShadow position={[0, def.height / 2, 0]}>
          <boxGeometry args={[w, def.height, d]} />
          <meshStandardMaterial color={def.color} roughness={0.75} />
        </mesh>
      )}

      <Billboard position={[0, def.height + 1.4, 0]}>
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
