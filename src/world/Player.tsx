import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Vector3 } from 'three';
import { useGame } from '@/state/gameStore';
import { useKeyboardControls } from '@/hooks/useKeyboardControls';
import { nearestBuilding } from '@/hooks/useProximity';
import { BUILDINGS, type BuildingDef, type BuildingId } from '@/data/buildings';
import { Audio } from '@/audio/AudioManager';
import { touchInput } from '@/hooks/useTouchInput';
import {
  PLAYER_SPEED,
  PLAYER_ACCEL,
  PLAYER_RADIUS,
  ISLAND_RADIUS,
  ISLAND_EDGE_MARGIN,
  PLAZA_RADIUS,
} from '@/constants/world';

const tmp = new Vector3();
const tmpVel = new Vector3();

// Palette — South Asian medium-tan skin, white shirt, khaki pants, GT-gold wristband.
const SKIN = '#b3805d';
const HAIR = '#1f1814';
const SHIRT = '#f6f1e4';
const PANTS = '#bfa376';
const SHOES = '#3a2818';
const GT_GOLD = '#d4b86a';

function collideBuildings(nx: number, nz: number, px: number, pz: number): [number, number] {
  let outX = nx;
  let outZ = nz;
  for (const b of BUILDINGS) {
    [outX, outZ] = collideBuilding(outX, outZ, px, pz, b);
  }
  return [outX, outZ];
}

function collideBuilding(nx: number, nz: number, px: number, pz: number, b: BuildingDef): [number, number] {
  const s = b.shape;
  const bx = b.position[0];
  const bz = b.position[2];
  switch (s.kind) {
    case 'cylinder':
      return collideEllipse(nx, nz, px, pz, bx, bz, s.radius, s.radius);
    case 'oval':
      return collideEllipse(nx, nz, px, pz, bx, bz, s.radiusX, s.radiusZ);
    case 'dome':
      return collideEllipse(nx, nz, px, pz, bx, bz, s.radius, s.radius);
    case 'box':
      return collideBox(nx, nz, px, pz, bx, bz, s.width / 2, s.depth / 2);
    case 'twin':
      return collideBox(nx, nz, px, pz, bx, bz, (s.spacing + s.width) / 2, s.depth / 2);
    case 'disc':
      return [nx, nz];
  }
}

function collideEllipse(
  nx: number,
  nz: number,
  px: number,
  pz: number,
  cx: number,
  cz: number,
  radiusX: number,
  radiusZ: number,
): [number, number] {
  const rx = radiusX + PLAYER_RADIUS;
  const rz = radiusZ + PLAYER_RADIUS;
  let dx = nx - cx;
  let dz = nz - cz;
  let norm = Math.hypot(dx / rx, dz / rz);
  if (norm >= 1) return [nx, nz];

  if (norm < 0.0001) {
    dx = px - cx;
    dz = pz - cz;
    norm = Math.hypot(dx / rx, dz / rz) || 1;
  }

  const scale = 1 / norm;
  return [cx + dx * scale, cz + dz * scale];
}

function collideBox(
  nx: number,
  nz: number,
  px: number,
  pz: number,
  cx: number,
  cz: number,
  halfX: number,
  halfZ: number,
): [number, number] {
  const hw = halfX + PLAYER_RADIUS;
  const hd = halfZ + PLAYER_RADIUS;
  if (nx <= cx - hw || nx >= cx + hw || nz <= cz - hd || nz >= cz + hd) {
    return [nx, nz];
  }

  const wasInsideX = px > cx - hw && px < cx + hw;
  const wasInsideZ = pz > cz - hd && pz < cz + hd;
  const penX = hw - Math.abs(nx - cx);
  const penZ = hd - Math.abs(nz - cz);
  const pushX = (!wasInsideX && wasInsideZ) || (wasInsideX === wasInsideZ && penX < penZ);

  if (pushX) {
    const sign = Math.sign(nx - cx || px - cx) || 1;
    return [cx + sign * hw, nz];
  }

  const sign = Math.sign(nz - cz || pz - cz) || 1;
  return [nx, cz + sign * hd];
}

export function Player() {
  const keys = useKeyboardControls();
  const group = useRef<Group>(null);
  const bobGroup = useRef<Group>(null); // child that bobs while walking
  const leftLeg = useRef<Group>(null);
  const rightLeg = useRef<Group>(null);
  const leftArm = useRef<Group>(null);
  const rightArm = useRef<Group>(null);
  const velRef = useRef<Vector3>(new Vector3());
  const yawRef = useRef<number>(0);
  const lastNearby = useRef<string | null>(null);
  const walkPhase = useRef<number>(0);
  const lastStepIdx = useRef<number>(-1);

  useFrame((_state, rawDelta) => {
    if (!group.current) return;
    const delta = Math.min(rawDelta, 0.05);
    const paused = useGame.getState().isPaused();

    const k = paused ? { up: false, down: false, left: false, right: false } : keys.current;
    let dirX = 0;
    let dirZ = 0;
    if (k.up) dirZ -= 1;
    if (k.down) dirZ += 1;
    if (k.left) dirX -= 1;
    if (k.right) dirX += 1;
    let len = Math.hypot(dirX, dirZ);
    let speedScale = 1;
    if (len > 0) {
      dirX /= len;
      dirZ /= len;
    } else if (!paused && touchInput.magnitude > 0) {
      // Mobile joystick — magnitude already in [0,1] for variable speed.
      const tm = Math.hypot(touchInput.dx, touchInput.dz) || 1;
      dirX = touchInput.dx / tm;
      dirZ = touchInput.dz / tm;
      len = 1;
      speedScale = touchInput.magnitude;
    }

    const targetVx = dirX * PLAYER_SPEED * speedScale;
    const targetVz = dirZ * PLAYER_SPEED * speedScale;
    const accelStep = PLAYER_ACCEL * delta;
    const vel = velRef.current;
    vel.x += clamp(targetVx - vel.x, -accelStep, accelStep);
    vel.z += clamp(targetVz - vel.z, -accelStep, accelStep);
    if (len === 0 && vel.lengthSq() < 0.01) {
      vel.set(0, 0, 0);
    }

    const pos = group.current.position;
    let nx = pos.x + vel.x * delta;
    let nz = pos.z + vel.z * delta;

    [nx, nz] = collideBuildings(nx, nz, pos.x, pos.z);

    const r = Math.hypot(nx, nz);
    const maxR = ISLAND_RADIUS - ISLAND_EDGE_MARGIN;
    if (r > maxR) {
      const ratio = maxR / r;
      nx *= ratio;
      nz *= ratio;
    }

    pos.x = nx;
    pos.z = nz;

    if (len > 0) {
      const targetYaw = Math.atan2(dirX, dirZ);
      yawRef.current = lerpAngle(yawRef.current, targetYaw, Math.min(1, delta * 12));
      group.current.rotation.y = yawRef.current;
    }

    // Walking animation: bob and swing limbs proportional to speed
    const speed = Math.hypot(vel.x, vel.z);
    const targetPhaseRate = speed * 1.6; // radians/sec
    walkPhase.current += targetPhaseRate * delta;
    if (bobGroup.current) {
      const moving = speed > 0.1 ? 1 : 0;
      bobGroup.current.position.y = Math.abs(Math.sin(walkPhase.current)) * 0.06 * moving;
    }
    const swing = Math.sin(walkPhase.current) * 0.6 * Math.min(1, speed / PLAYER_SPEED);
    if (leftLeg.current) leftLeg.current.rotation.x = swing;
    if (rightLeg.current) rightLeg.current.rotation.x = -swing;
    if (leftArm.current) leftArm.current.rotation.x = -swing * 0.7;
    if (rightArm.current) rightArm.current.rotation.x = swing * 0.7;

    // Footstep audio — fire on each peak of the leg-swing oscillation while
    // actually moving. Surface picked from path/plaza heuristic.
    if (speed > 0.6) {
      const phaseN = walkPhase.current / Math.PI; // half-cycles
      const stepIdx = Math.floor(phaseN);
      if (stepIdx !== lastStepIdx.current) {
        lastStepIdx.current = stepIdx;
        // Plaza or path tile? Plaza is a circle near origin; main paths run
        // along ±X and ±Z within 1.0u of the axis lines, between plaza edge
        // and ~14u out.
        const onPlazaXZ = Math.hypot(pos.x, pos.z) < PLAZA_RADIUS + 0.5;
        const onPathXZ =
          !onPlazaXZ &&
          ((Math.abs(pos.x) < 1.0 && Math.abs(pos.z) < PLAZA_RADIUS + 14) ||
            (Math.abs(pos.z) < 1.0 && Math.abs(pos.x) < PLAZA_RADIUS + 14));
        Audio.footstep(onPlazaXZ || onPathXZ ? 'stone' : 'grass');
      }
    } else {
      lastStepIdx.current = -1;
    }

    useGame.setState({ playerPosition: [pos.x, pos.y, pos.z], playerFacing: yawRef.current });

    const near = nearestBuilding(pos.x, pos.z);
    const newId = near?.id ?? null;
    const zoneIntensity = near ? proximityAudioIntensity(near.id, near.dist) : 0;
    Audio.enterZone(newId, zoneIntensity);
    if (newId !== lastNearby.current) {
      // Soft chime when a fresh interaction prompt becomes available.
      if (newId && !lastNearby.current) Audio.uiPrompt();
      lastNearby.current = newId;
      useGame.getState().setNearbyBuilding(newId);
    }

    const onPlaza = Math.hypot(pos.x, pos.z) < PLAZA_RADIUS + 0.5;
    const zone = newId
      ? `Near ${labelFor(newId)}`
      : onPlaza
        ? 'Spawn Plaza'
        : 'The Meadow';
    if (useGame.getState().zoneLabel !== zone) {
      useGame.getState().setZoneLabel(zone);
    }

    tmp.set(0, 0, 0);
    tmpVel.set(0, 0, 0);
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      <group ref={bobGroup}>
        {/* Legs — pivot at the hip, swing about X */}
        <group ref={leftLeg} position={[-0.16, 0.7, 0]}>
          <mesh castShadow position={[0, -0.35, 0]}>
            <cylinderGeometry args={[0.12, 0.11, 0.7, 12]} />
            <meshStandardMaterial color={PANTS} roughness={0.85} />
          </mesh>
          {/* Shoe */}
          <mesh castShadow position={[0, -0.74, 0.06]}>
            <boxGeometry args={[0.18, 0.1, 0.32]} />
            <meshStandardMaterial color={SHOES} roughness={0.6} />
          </mesh>
        </group>
        <group ref={rightLeg} position={[0.16, 0.7, 0]}>
          <mesh castShadow position={[0, -0.35, 0]}>
            <cylinderGeometry args={[0.12, 0.11, 0.7, 12]} />
            <meshStandardMaterial color={PANTS} roughness={0.85} />
          </mesh>
          <mesh castShadow position={[0, -0.74, 0.06]}>
            <boxGeometry args={[0.18, 0.1, 0.32]} />
            <meshStandardMaterial color={SHOES} roughness={0.6} />
          </mesh>
        </group>

        {/* Torso — white button-down shirt */}
        <mesh castShadow position={[0, 1.0, 0]}>
          <boxGeometry args={[0.5, 0.65, 0.32]} />
          <meshStandardMaterial color={SHIRT} roughness={0.7} />
        </mesh>
        {/* Belt */}
        <mesh position={[0, 0.66, 0]}>
          <boxGeometry args={[0.54, 0.06, 0.34]} />
          <meshStandardMaterial color="#2a1a10" roughness={0.6} />
        </mesh>

        {/* Arms — pivot at shoulder */}
        <group ref={leftArm} position={[-0.32, 1.28, 0]}>
          <mesh castShadow position={[0, -0.3, 0]}>
            <cylinderGeometry args={[0.085, 0.08, 0.6, 12]} />
            <meshStandardMaterial color={SHIRT} roughness={0.7} />
          </mesh>
          {/* Forearm (rolled-up sleeve — skin) */}
          <mesh castShadow position={[0, -0.66, 0]}>
            <cylinderGeometry args={[0.08, 0.075, 0.18, 12]} />
            <meshStandardMaterial color={SKIN} roughness={0.55} />
          </mesh>
          {/* GT-gold wristband on left wrist */}
          <mesh position={[0, -0.76, 0]}>
            <cylinderGeometry args={[0.085, 0.085, 0.04, 12]} />
            <meshStandardMaterial color={GT_GOLD} roughness={0.4} metalness={0.5} emissive={GT_GOLD} emissiveIntensity={0.25} />
          </mesh>
        </group>
        <group ref={rightArm} position={[0.32, 1.28, 0]}>
          <mesh castShadow position={[0, -0.3, 0]}>
            <cylinderGeometry args={[0.085, 0.08, 0.6, 12]} />
            <meshStandardMaterial color={SHIRT} roughness={0.7} />
          </mesh>
          <mesh castShadow position={[0, -0.66, 0]}>
            <cylinderGeometry args={[0.08, 0.075, 0.18, 12]} />
            <meshStandardMaterial color={SKIN} roughness={0.55} />
          </mesh>
        </group>

        {/* Neck */}
        <mesh position={[0, 1.4, 0]}>
          <cylinderGeometry args={[0.09, 0.1, 0.1, 12]} />
          <meshStandardMaterial color={SKIN} roughness={0.6} />
        </mesh>
        {/* Head */}
        <mesh castShadow position={[0, 1.62, 0]}>
          <sphereGeometry args={[0.22, 20, 16]} />
          <meshStandardMaterial color={SKIN} roughness={0.6} />
        </mesh>
        {/* Hair — half-sphere cap, neat sides */}
        <mesh castShadow position={[0, 1.7, -0.015]}>
          <sphereGeometry args={[0.235, 20, 16, 0, Math.PI * 2, 0, Math.PI / 2 * 0.95]} />
          <meshStandardMaterial color={HAIR} roughness={0.5} />
        </mesh>
        {/* Beard — flattened against the lower face so it stays attached in isometric view. */}
        <mesh position={[0, 1.5, 0.18]} scale={[1, 0.7, 0.28]}>
          <sphereGeometry args={[0.13, 14, 10]} />
          <meshStandardMaterial color={HAIR} roughness={0.55} />
        </mesh>
        {/* Eyes — tiny dark spheres */}
        <mesh position={[-0.07, 1.62, 0.17]}>
          <sphereGeometry args={[0.022, 8, 6]} />
          <meshStandardMaterial color="#1a1410" roughness={0.4} />
        </mesh>
        <mesh position={[0.07, 1.62, 0.17]}>
          <sphereGeometry args={[0.022, 8, 6]} />
          <meshStandardMaterial color="#1a1410" roughness={0.4} />
        </mesh>
      </group>
    </group>
  );
}

function clamp(v: number, min: number, max: number) {
  return v < min ? min : v > max ? max : v;
}

function lerpAngle(a: number, b: number, t: number) {
  let diff = b - a;
  while (diff > Math.PI) diff -= Math.PI * 2;
  while (diff < -Math.PI) diff += Math.PI * 2;
  return a + diff * t;
}

function labelFor(id: string) {
  const b = BUILDINGS.find((x) => x.id === id);
  return b ? b.shortLabel : id;
}

function proximityAudioIntensity(id: BuildingId, distFromCenter: number): number {
  const b = BUILDINGS.find((x) => x.id === id);
  if (!b) return 0;
  const bodyRadius = audioBodyRadius(b);
  const fadeDistance = Math.max(1, b.triggerRadius - bodyRadius);
  return clamp((b.triggerRadius - distFromCenter) / fadeDistance, 0, 1);
}

function audioBodyRadius(def: BuildingDef): number {
  const s = def.shape;
  switch (s.kind) {
    case 'cylinder':
    case 'dome':
    case 'disc':
      return s.radius;
    case 'oval':
      return Math.max(s.radiusX, s.radiusZ);
    case 'box':
      return Math.hypot(s.width / 2, s.depth / 2);
    case 'twin':
      return Math.hypot((s.spacing + s.width) / 2, s.depth / 2);
  }
}
