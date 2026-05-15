import { COLORS, PLAZA_RADIUS, PATH_WIDTH, PATH_LENGTH } from '@/constants/world';

export function Plaza() {
  return (
    <group position={[0, 0.01, 0]}>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[PLAZA_RADIUS, 48]} />
        <meshStandardMaterial color={COLORS.plaza} roughness={0.85} />
      </mesh>

      {[
        { rot: 0, pos: [0, 0, -(PLAZA_RADIUS + PATH_LENGTH / 2)] as [number, number, number] },
        { rot: 0, pos: [0, 0, PLAZA_RADIUS + PATH_LENGTH / 2] as [number, number, number] },
        { rot: Math.PI / 2, pos: [PLAZA_RADIUS + PATH_LENGTH / 2, 0, 0] as [number, number, number] },
        { rot: Math.PI / 2, pos: [-(PLAZA_RADIUS + PATH_LENGTH / 2), 0, 0] as [number, number, number] },
      ].map((p, i) => (
        <mesh key={i} receiveShadow position={p.pos} rotation={[-Math.PI / 2, 0, p.rot]}>
          <planeGeometry args={[PATH_WIDTH, PATH_LENGTH]} />
          <meshStandardMaterial color={COLORS.path} roughness={0.9} />
        </mesh>
      ))}

      <group position={[0, 0, PLAZA_RADIUS - 1.4]}>
        <mesh castShadow position={[0, 1.1, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 2.2, 8]} />
          <meshStandardMaterial color={COLORS.sign} roughness={0.8} />
        </mesh>
        <mesh castShadow position={[0, 2.1, 0]}>
          <boxGeometry args={[1.8, 0.6, 0.12]} />
          <meshStandardMaterial color="#f1e4c4" roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
}
