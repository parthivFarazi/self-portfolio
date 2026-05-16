import { useMemo } from 'react';
import {
  CanvasTexture,
  RepeatWrapping,
  CylinderGeometry,
  MeshStandardMaterial,
  Vector2,
  type BufferAttribute,
} from 'three';
import { COLORS, ISLAND_RADIUS, ISLAND_THICKNESS } from '@/constants/world';
import { BUILDINGS, footprintHalfExtents } from '@/data/buildings';

// Hand-picked grove centers — 7 "dark patches" under future tree clusters.
// Keeping this small caps the per-fragment loop count in the grass shader.
const GROVE_CENTERS: [number, number][] = [
  [-35, -21],   // NW Tech Tower frame grove
  [0, -48],     // N UPDT pine stand
  [53, -43],    // NE Petronas backdrop
  [-62, 0],     // W Archive/Qard fringe
  [55, 38],     // E Lighthouse cove
  [-50, 56],    // SW Zen Garden surround
  [24, 64],     // S Heatmap/Workshop fringe
];

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

// Phase 4 — inject noise-based color variation into the grass material:
//  • broad low-freq noise darkens/lightens random patches
//  • tree-canopy centers tint darker (shadow under foliage)
//  • building entrance fronts get a worn lighter tint
// Implemented via onBeforeCompile so we keep MeshStandardMaterial's lighting.
function buildGrassMaterial(grass: CanvasTexture): MeshStandardMaterial {
  // Dark spots = grove CENTERS (7), not individual trees (24+) — keeps the
  // fragment shader's per-pixel loop short. Worn spots = building entrance
  // fronts derived from footprints.
  const darkSpots: Vector2[] = GROVE_CENTERS.map(([x, z]) => new Vector2(x, z));
  const wornSpots: Vector2[] = [];
  for (const b of BUILDINGS) {
    const fp = footprintHalfExtents(b);
    if (!fp) continue;
    // Worn ground sits in front of each building (toward the plaza). We bias
    // the entrance point along the direction from building back toward origin.
    const dx = -b.position[0];
    const dz = -b.position[2];
    const m = Math.hypot(dx, dz) || 1;
    const ex = b.position[0] + (dx / m) * (Math.max(fp.halfX, fp.halfZ) + 1.5);
    const ez = b.position[2] + (dz / m) * (Math.max(fp.halfX, fp.halfZ) + 1.5);
    wornSpots.push(new Vector2(ex, ez));
  }

  const DARK_COUNT = darkSpots.length;
  const WORN_COUNT = wornSpots.length;

  const mat = new MeshStandardMaterial({ map: grass, roughness: 0.95 });
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uDarkSpots = { value: darkSpots };
    shader.uniforms.uWornSpots = { value: wornSpots };

    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
         varying vec3 vWorldPos;`,
      )
      .replace(
        '#include <worldpos_vertex>',
        `#include <worldpos_vertex>
         vWorldPos = worldPosition.xyz;`,
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
         varying vec3 vWorldPos;
         uniform vec2 uDarkSpots[${DARK_COUNT}];
         uniform vec2 uWornSpots[${WORN_COUNT}];
         float hash21(vec2 p) {
           return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
         }
         float vnoise(vec2 p) {
           vec2 i = floor(p);
           vec2 f = fract(p);
           vec2 u = f * f * (3.0 - 2.0 * f);
           return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
                      mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
         }`,
      )
      .replace(
        '#include <color_fragment>',
        `#include <color_fragment>
         vec2 wp = vWorldPos.xz;
         // Broad low-freq variation — natural patchy color.
         float n = vnoise(wp * 0.045) * 0.7 + vnoise(wp * 0.18) * 0.3;
         float varMul = 0.90 + n * 0.18;
         diffuseColor.rgb *= varMul;

         // Subtle darkening under tree-grove centers.
         float darkBoost = 0.0;
         for (int i = 0; i < ${DARK_COUNT}; i++) {
           float d = distance(wp, uDarkSpots[i]);
           darkBoost += exp(-d * d * 0.05);
         }
         diffuseColor.rgb *= 1.0 - clamp(darkBoost * 0.09, 0.0, 0.18);

         // Worn lighter grass near building entrances — narrow, subtle.
         float wornBoost = 0.0;
         for (int i = 0; i < ${WORN_COUNT}; i++) {
           float d = distance(wp, uWornSpots[i]);
           wornBoost += exp(-d * d * 0.45);
         }
         diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.78, 0.76, 0.52),
                                clamp(wornBoost * 0.12, 0.0, 0.20));`,
      );
  };
  // Force recompile if the material is reused.
  mat.needsUpdate = true;
  return mat;
}

export function Island() {
  const grass = useMemo(makeGrassTexture, []);
  const topGeo = useMemo(makeTopGeometry, []);
  const grassMat = useMemo(() => buildGrassMaterial(grass), [grass]);

  return (
    <group>
      {/* Grassy top with undulation + shader color variation */}
      <mesh
        receiveShadow
        castShadow
        geometry={topGeo}
        material={grassMat}
        position={[0, -ISLAND_THICKNESS / 2, 0]}
      />

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
