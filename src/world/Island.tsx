import { useMemo } from 'react';
import { CanvasTexture, RepeatWrapping, CylinderGeometry, type BufferAttribute } from 'three';
import { COLORS, ISLAND_RADIUS, ISLAND_THICKNESS } from '@/constants/world';

function makeGrassTexture() {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 512;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = COLORS.grass;
  ctx.fillRect(0, 0, c.width, c.height);
  // Painterly soft dabs first
  for (let i = 0; i < 90; i++) {
    const x = Math.random() * c.width;
    const y = Math.random() * c.height;
    const r = 22 + Math.random() * 40;
    ctx.fillStyle = i % 3 === 0 ? '#5fa854' : i % 3 === 1 ? '#7fc471' : '#4a8a48';
    ctx.globalAlpha = 0.12 + Math.random() * 0.18;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  // Tiny blade flecks
  for (let i = 0; i < 1400; i++) {
    const x = Math.random() * c.width;
    const y = Math.random() * c.height;
    const r = 1 + Math.random() * 2.2;
    ctx.fillStyle = Math.random() > 0.5 ? COLORS.grassDeep : '#7fc471';
    ctx.globalAlpha = 0.35 + Math.random() * 0.4;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  const tex = new CanvasTexture(c);
  tex.wrapS = tex.wrapT = RepeatWrapping;
  tex.repeat.set(10, 10);
  tex.anisotropy = 4;
  return tex;
}

// Cheap deterministic noise — three layered sines.
function noise2(x: number, z: number): number {
  return (
    Math.sin(x * 0.18 + z * 0.13) * 0.6 +
    Math.sin(x * 0.07 - z * 0.09) * 0.4 +
    Math.sin(x * 0.31 + z * 0.27) * 0.18
  );
}

function makeTopGeometry() {
  // High-segment cylinder; we displace just the top cap vertices.
  const geo = new CylinderGeometry(ISLAND_RADIUS, ISLAND_RADIUS, ISLAND_THICKNESS, 128, 1);
  const pos = geo.attributes.position as BufferAttribute;
  const arr = pos.array as Float32Array;
  const topY = ISLAND_THICKNESS / 2;
  for (let i = 0; i < arr.length; i += 3) {
    const x = arr[i];
    const y = arr[i + 1];
    const z = arr[i + 2];
    if (Math.abs(y - topY) < 0.01) {
      const r = Math.hypot(x, z);
      // Don't lift the rim — keeps the bevel reading clean.
      const rimFalloff = Math.max(0, 1 - Math.max(0, r - (ISLAND_RADIUS - 8)) / 8);
      arr[i + 1] = y + noise2(x, z) * 0.5 * rimFalloff;
    }
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

export function Island() {
  const grass = useMemo(makeGrassTexture, []);
  const topGeo = useMemo(makeTopGeometry, []);

  return (
    <group>
      {/* Grassy top with gentle undulation */}
      <mesh receiveShadow castShadow geometry={topGeo} position={[0, -ISLAND_THICKNESS / 2, 0]}>
        <meshStandardMaterial map={grass} roughness={0.95} />
      </mesh>

      {/* Beveled rim — tan flare outward */}
      <mesh position={[0, -ISLAND_THICKNESS - 0.4, 0]}>
        <cylinderGeometry args={[ISLAND_RADIUS, ISLAND_RADIUS - 1.2, 1.2, 96]} />
        <meshStandardMaterial color="#a8915f" roughness={0.92} />
      </mesh>
      {/* Rock underbelly */}
      <mesh position={[0, -ISLAND_THICKNESS - 1.8, 0]}>
        <cylinderGeometry args={[ISLAND_RADIUS - 1.2, ISLAND_RADIUS - 10, 2.4, 96]} />
        <meshStandardMaterial color="#6a5a42" roughness={1} />
      </mesh>
    </group>
  );
}
