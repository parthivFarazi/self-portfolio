import { useMemo } from 'react';
import { CanvasTexture, RepeatWrapping } from 'three';
import { COLORS, PLAZA_RADIUS, PATH_WIDTH } from '@/constants/world';

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

// Solid portion of each path. The remaining reach is covered by a
// scatter of loose pavers so the path melts into the lawn rather than
// stopping on a hard rectangular cut.
const MAIN_LEN = 11;

export function Plaza() {
  const tile = useMemo(makeStoneTileTexture, []);

  const pathTile = useMemo(() => {
    const t = tile.clone();
    // U runs along the strip length (MAIN_LEN), V across its width.
    t.repeat.set(MAIN_LEN / (PATH_WIDTH * 1.4), 1);
    t.needsUpdate = true;
    return t;
  }, [tile]);

  const plazaTile = useMemo(() => {
    const t = tile.clone();
    t.repeat.set(2, 2);
    t.needsUpdate = true;
    return t;
  }, [tile]);

  // Deterministic loose-paver scatter that spills from the end of every
  // path into the grass. Same set reused for all four paths (rotated by
  // the group), so the four endings read consistently.
  const scatter = useMemo(() => {
    let s = 0x9e3779b9;
    const rnd = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
    const arr: Array<{
      k: number; x: number; z: number; w: number; h: number; rot: number; color: string;
    }> = [];
    const N = 24;
    for (let i = 0; i < N; i++) {
      const t = i / (N - 1);                       // 0 (path edge) → 1 (far)
      // Thin the scatter out as it reaches into the lawn.
      if (t > 0.4 && rnd() < (t - 0.4) * 1.25) continue;
      const sc = 1 - t * 0.4;
      const spread = PATH_WIDTH * 0.6 + t * 1.35;
      arr.push({
        k: i,
        x: PLAZA_RADIUS + MAIN_LEN - 1.2 + t * 5.6,
        z: (rnd() * 2 - 1) * spread,
        w: (0.72 + rnd() * 0.46) * sc,
        h: (0.5 + rnd() * 0.32) * sc,
        rot: (rnd() * 2 - 1) * 0.95,
        color: `rgb(${214 + Math.floor(rnd() * 20)}, ${190 + Math.floor(rnd() * 16)}, ${142 + Math.floor(rnd() * 20)})`,
      });
    }
    return arr;
  }, []);

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

      {/* 4 cardinal paths — solid strip + loose-paver scatter so each
          path dissolves into the lawn instead of ending on a hard cut.
          The group yaw aligns local +X with the outward direction. */}
      {[Math.PI / 2, -Math.PI / 2, 0, Math.PI].map((yaw, i) => (
        <group key={i} rotation={[0, yaw, 0]}>
          {/* Solid brick strip */}
          <mesh receiveShadow position={[PLAZA_RADIUS + MAIN_LEN / 2, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[MAIN_LEN, PATH_WIDTH * 1.4]} />
            <meshStandardMaterial map={pathTile} roughness={0.92} />
          </mesh>
          {/* Loose pavers spilling into the grass */}
          {scatter.map((b) => (
            <mesh key={b.k} receiveShadow position={[b.x, 0.008, b.z]} rotation={[-Math.PI / 2, 0, b.rot]}>
              <planeGeometry args={[b.w, b.h]} />
              <meshStandardMaterial color={b.color} roughness={0.95} />
            </mesh>
          ))}
        </group>
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
