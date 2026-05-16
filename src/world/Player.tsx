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
    const fp = footprintHalfExtents(b);
    if (!fp) continue;
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
  const bobGroup = useRef<Group>(null); // child that bobs while walking
  const leftLeg = useRef<Group>(null);
  const rightLeg = useRef<Group>(null);
  const leftArm = useRef<Group>(null);
  const rightArm = useRef<Group>(null);
  const velRef = useRef<Vector3>(new Vector3());
  const yawRef = useRef<number>(0);
  const lastNearby = useRef<string | null>(null);
  const walkPhase = useRef<number>(0);

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

    useGame.setState({ playerPosition: [pos.x, pos.y, pos.z], playerFacing: yawRef.current });

    const near = nearestBuilding(pos.x, pos.z);
    const newId = near?.id ?? null;
    if (newId !== lastNearby.current) {
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
        {/* Beard — short, framing the chin */}
        <mesh position={[0, 1.5, 0.16]}>
          <sphereGeometry args={[0.18, 16, 12, 0, Math.PI * 2, Math.PI / 2.4, Math.PI / 3]} />
          <meshStandardMaterial color={HAIR} roughness={0.55} />
        </mesh>
        {/* Eyes — tiny dark spheres */}
        <mesh position={[-0.07, 1.62, 0.18]}>
          <sphereGeometry args={[0.022, 8, 6]} />
          <meshStandardMaterial color="#1a1410" roughness={0.4} />
        </mesh>
        <mesh position={[0.07, 1.62, 0.18]}>
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
