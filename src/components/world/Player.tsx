import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Vector3 } from 'three';
import { useGame } from '@/state/gameStore';
import { useKeyboardControls } from '@/hooks/useKeyboardControls';
import { nearestBuilding } from '@/hooks/useProximity';
import { BUILDINGS, footprintHalfExtents } from '@/data/buildings';
import {
  PLAYER_SPEED,
  PLAYER_ACCEL,
  PLAYER_RADIUS,
  ISLAND_RADIUS,
  ISLAND_EDGE_MARGIN,
  PLAZA_RADIUS,
} from '@/constants/world';

const HALF = Math.PI / 2;
const tmp = new Vector3();
const tmpVel = new Vector3();

function collideBuildings(nx: number, nz: number, px: number, pz: number): [number, number] {
  let outX = nx;
  let outZ = nz;
  for (const b of BUILDINGS) {
    const fp = footprintHalfExtents(b);
    if (!fp) continue; // walk-onto shapes (gardens) don't collide
    const halfW = fp.halfX + PLAYER_RADIUS;
    const halfD = fp.halfZ + PLAYER_RADIUS;
    const bx = b.position[0];
    const bz = b.position[2];
    if (outX > bx - halfW && outX < bx + halfW && outZ > bz - halfD && outZ < bz + halfD) {
      const overlapX = outX > bx ? outX - (bx + halfW) : outX - (bx - halfW);
      const overlapZ = outZ > bz ? outZ - (bz + halfD) : outZ - (bz - halfD);
      const dx = Math.abs(outX - px);
      const dz = Math.abs(outZ - pz);
      if (dx > dz) outX -= overlapX;
      else outZ -= overlapZ;
    }
  }
  return [outX, outZ];
}

export function Player() {
  const keys = useKeyboardControls();
  const group = useRef<Group>(null);
  const velRef = useRef<Vector3>(new Vector3());
  const yawRef = useRef<number>(0);
  const lastNearby = useRef<string | null>(null);

  useFrame((_state, rawDelta) => {
    if (!group.current) return;
    // Clamp delta so tab-throttled frames can't tunnel the player through buildings.
    const delta = Math.min(rawDelta, 0.05);
    const paused = useGame.getState().isPaused();

    const k = paused ? { up: false, down: false, left: false, right: false } : keys.current;
    let dirX = 0;
    let dirZ = 0;
    if (k.up) dirZ -= 1;
    if (k.down) dirZ += 1;
    if (k.left) dirX -= 1;
    if (k.right) dirX += 1;
    const len = Math.hypot(dirX, dirZ);
    if (len > 0) {
      dirX /= len;
      dirZ /= len;
    }

    const targetVx = dirX * PLAYER_SPEED;
    const targetVz = dirZ * PLAYER_SPEED;
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

    // Sync to store (throttle via comparison would be nicer; this is fine for Phase 1).
    useGame.setState({ playerPosition: [pos.x, pos.y, pos.z], playerFacing: yawRef.current });

    // Proximity
    const near = nearestBuilding(pos.x, pos.z);
    const newId = near?.id ?? null;
    if (newId !== lastNearby.current) {
      lastNearby.current = newId;
      useGame.getState().setNearbyBuilding(newId);
    }

    // Zone label
    const onPlaza = Math.hypot(pos.x, pos.z) < PLAZA_RADIUS + 0.5;
    const zone = newId
      ? `Near ${labelFor(newId)}`
      : onPlaza
        ? 'Spawn Plaza'
        : 'Resume World';
    if (useGame.getState().zoneLabel !== zone) {
      useGame.getState().setZoneLabel(zone);
    }

    tmp.set(0, 0, 0);
    tmpVel.set(0, 0, 0);
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* Body */}
      <mesh castShadow position={[0, 0.85, 0]}>
        <capsuleGeometry args={[0.32, 0.85, 6, 12]} />
        <meshStandardMaterial color="#f6f1e4" roughness={0.7} />
      </mesh>
      {/* Pants */}
      <mesh castShadow position={[0, 0.35, 0]}>
        <capsuleGeometry args={[0.34, 0.4, 6, 12]} />
        <meshStandardMaterial color="#bfa376" roughness={0.85} />
      </mesh>
      {/* Head */}
      <mesh castShadow position={[0, 1.7, 0]}>
        <sphereGeometry args={[0.28, 20, 16]} />
        <meshStandardMaterial color="#b3805d" roughness={0.6} />
      </mesh>
      {/* Hair */}
      <mesh castShadow position={[0, 1.85, -0.02]}>
        <sphereGeometry args={[0.3, 20, 16, 0, Math.PI * 2, 0, HALF * 1.1]} />
        <meshStandardMaterial color="#1f1814" roughness={0.5} />
      </mesh>
      {/* Facing indicator: tiny nose, helps you see rotation */}
      <mesh position={[0, 1.7, 0.28]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#9a6a4a" roughness={0.6} />
      </mesh>
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
