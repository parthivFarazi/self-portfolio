import { useMemo } from 'react';
import { CanvasTexture, RepeatWrapping } from 'three';
import { COLORS, PLAZA_RADIUS, PATH_WIDTH, PATH_LENGTH } from '@/constants/world';

function makeStoneTileTexture() {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext('2d')!;
  // Mortar
  ctx.fillStyle = '#a89070';
  ctx.fillRect(0, 0, c.width, c.height);
  // Tile grid, brick offset
  const tileW = 64;
  const tileH = 32;
  for (let row = 0; row < c.height / tileH + 1; row++) {
    const yOff = row * tileH;
    const xShift = row % 2 === 0 ? 0 : tileW / 2;
    for (let col = -1; col < c.width / tileW + 1; col++) {
      const x = col * tileW + xShift;
      const v = Math.sin(row * 13.7 + col * 7.1) * 0.5 + 0.5;
      const shade = 200 + Math.floor(v * 40);
      ctx.fillStyle = `rgb(${shade}, ${shade - 24}, ${shade - 60})`;
      ctx.fillRect(x + 1.5, yOff + 1.5, tileW - 3, tileH - 3);
    }
  }
  // Scuffs
  for (let i = 0; i < 220; i++) {
    ctx.fillStyle = `rgba(120, 90, 50, ${0.04 + Math.random() * 0.08})`;
    const x = Math.random() * c.width;
    const y = Math.random() * c.height;
    ctx.beginPath();
    ctx.arc(x, y, 1 + Math.random() * 2, 0, Math.PI * 2);
    ctx.fill();
  }
  const tex = new CanvasTexture(c);
  tex.wrapS = tex.wrapT = RepeatWrapping;
  return tex;
}

export function Plaza() {
  const tile = useMemo(makeStoneTileTexture, []);

  const pathTile = useMemo(() => {
    const t = tile.clone();
    t.repeat.set(1, PATH_LENGTH / (PATH_WIDTH * 1.4));
    t.needsUpdate = true;
    return t;
  }, [tile]);

  const plazaTile = useMemo(() => {
    const t = tile.clone();
    t.repeat.set(2, 2);
    t.needsUpdate = true;
    return t;
  }, [tile]);

  return (
    <group position={[0, 0.015, 0]}>
      {/* Plaza disc */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[PLAZA_RADIUS, 64]} />
        <meshStandardMaterial map={plazaTile} roughness={0.9} />
      </mesh>

      {/* Intersection accent ring */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <ringGeometry args={[PLAZA_RADIUS - 1.2, PLAZA_RADIUS - 0.4, 64]} />
        <meshStandardMaterial color="#cdb582" roughness={0.85} />
      </mesh>

      {/* 4 cardinal paths */}
      {[
        { rot: 0, pos: [0, 0, -(PLAZA_RADIUS + PATH_LENGTH / 2)] as [number, number, number] },
        { rot: 0, pos: [0, 0, PLAZA_RADIUS + PATH_LENGTH / 2] as [number, number, number] },
        { rot: Math.PI / 2, pos: [PLAZA_RADIUS + PATH_LENGTH / 2, 0, 0] as [number, number, number] },
        { rot: Math.PI / 2, pos: [-(PLAZA_RADIUS + PATH_LENGTH / 2), 0, 0] as [number, number, number] },
      ].map((p, i) => (
        <mesh key={i} receiveShadow position={p.pos} rotation={[-Math.PI / 2, 0, p.rot]}>
          <planeGeometry args={[PATH_WIDTH * 1.4, PATH_LENGTH]} />
          <meshStandardMaterial map={pathTile} roughness={0.92} />
        </mesh>
      ))}

      {/* Welcome sign */}
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
