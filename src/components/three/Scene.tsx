"use client";

import { useMemo, useRef, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { scrollStore } from "@/lib/scrollStore";
import { Barbell, Dumbbell, Kettlebell, PlateStack, PLATE_COLORS } from "./Equipment";

type Waypoint = {
  pos: [number, number, number];
  /** Where the object sits on screen: 1 right, -1 left, 0 centre. */
  side: -1 | 0 | 1;
  dist: number;
};

// One waypoint per page section, in order.
const WAYPOINTS: Waypoint[] = [
  { pos: [0, 0, 0], side: 1, dist: 8.5 }, // hero: barbell
  { pos: [14, -0.4, -3], side: -1, dist: 7 }, // about: kettlebell
  { pos: [28, 0.4, 0], side: 1, dist: 7.5 }, // programs: dumbbell
  { pos: [42, 0, -5], side: 0, dist: 13 }, // coaches: plate stack
  { pos: [56, -0.6, -4], side: 0, dist: 13 }, // schedule: dumbbell
  { pos: [70, 0, -5], side: 0, dist: 13 }, // membership: kettlebell
  { pos: [84, 0, 0], side: -1, dist: 8.5 }, // join: barbell
];

const smooth = (t: number) => t * t * (3 - 2 * t);

function CameraRig() {
  const look = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    const s = THREE.MathUtils.clamp(scrollStore.section, 0, WAYPOINTS.length - 1);
    const i = Math.min(Math.floor(s), WAYPOINTS.length - 1);
    const j = Math.min(i + 1, WAYPOINTS.length - 1);
    const f = s - i;
    const narrow = state.size.width / state.size.height < 0.9;

    const target = (w: Waypoint) => ({
      x: w.pos[0] - (narrow ? 0 : w.side * w.dist * 0.3),
      y: w.pos[1] + (narrow ? -1.8 : 0),
      z: w.pos[2] + w.dist,
    });
    const a = target(WAYPOINTS[i]);
    const b = target(WAYPOINTS[j]);
    const t = smooth(f);
    const tx = THREE.MathUtils.lerp(a.x, b.x, t);
    const ty = THREE.MathUtils.lerp(a.y, b.y, t);
    const tz = THREE.MathUtils.lerp(a.z, b.z, t);

    const cam = state.camera;
    cam.position.x = THREE.MathUtils.damp(cam.position.x, tx, 4, delta);
    cam.position.y = THREE.MathUtils.damp(cam.position.y, ty, 4, delta);
    cam.position.z = THREE.MathUtils.damp(cam.position.z, tz, 4, delta);

    const px = scrollStore.calm ? 0 : scrollStore.pointerX;
    const py = scrollStore.calm ? 0 : scrollStore.pointerY;
    look.current.set(cam.position.x + px * 0.5, cam.position.y + py * 0.3, cam.position.z - 10);
    cam.lookAt(look.current);
  });

  return null;
}

type StageProps = {
  index: number;
  spin?: number;
  children: ReactNode;
};

/** Places an object at its waypoint, spins it, and scales it up when it is in focus. */
function Stage({ index, spin = 0.28, children }: StageProps) {
  const outer = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const base = WAYPOINTS[index].pos;

  useFrame((state, delta) => {
    if (!outer.current || !inner.current) return;
    const dist = Math.abs(scrollStore.section - index);
    const target = THREE.MathUtils.clamp(1.15 - dist * 0.85, 0.3, 1);
    const sc = THREE.MathUtils.damp(outer.current.scale.x, target, 5, delta);
    outer.current.scale.setScalar(sc);

    const calm = scrollStore.calm;
    outer.current.position.y = base[1] + (calm ? 0 : Math.sin(state.clock.elapsedTime * 0.8 + index) * 0.1);
    outer.current.rotation.y = THREE.MathUtils.damp(
      outer.current.rotation.y,
      calm ? 0 : scrollStore.pointerX * 0.4,
      3,
      delta,
    );
    outer.current.rotation.x = THREE.MathUtils.damp(
      outer.current.rotation.x,
      calm ? 0 : -scrollStore.pointerY * 0.2,
      3,
      delta,
    );
    if (!calm) inner.current.rotation.y += delta * spin;
  });

  return (
    <group ref={outer} position={base}>
      <group ref={inner}>{children}</group>
    </group>
  );
}

/** Drifting chalk dust gives the camera travel something to parallax against. */
function ChalkDust() {
  const positions = useMemo(() => {
    const count = 700;
    const arr = new Float32Array(count * 3);
    for (let k = 0; k < count; k++) {
      arr[k * 3] = Math.random() * 100 - 8;
      arr[k * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[k * 3 + 2] = Math.random() * 16 - 12;
    }
    return arr;
  }, []);
  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!ref.current || scrollStore.calm) return;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} color="#9AA0A8" transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export default function Scene() {
  return (
    <div className="scene" aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [-2.5, 0, 8.5], fov: 35, near: 0.1, far: 200 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        eventSource={document.body}
        eventPrefix="client"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 7, 6]} intensity={2.2} />
        <directionalLight position={[-6, -2, 3]} intensity={0.6} color="#F2C230" />

        <Environment resolution={256}>
          <group rotation={[-Math.PI / 3, 0, 1]}>
            <Lightformer form="rect" intensity={4} position={[0, 5, -9]} scale={[10, 10, 1]} />
            <Lightformer form="rect" intensity={2} position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[10, 2, 1]} />
            <Lightformer form="rect" intensity={2} position={[10, 2, 0]} rotation-y={-Math.PI / 2} scale={[10, 2, 1]} />
            <Lightformer form="ring" intensity={3} color={PLATE_COLORS.yellow} position={[0, -6, 4]} scale={5} />
          </group>
        </Environment>

        <CameraRig />
        <ChalkDust />

        <Stage index={0} spin={0.18}>
          <Barbell intro />
        </Stage>
        <Stage index={1}>
          <Kettlebell color={PLATE_COLORS.yellow} />
        </Stage>
        <Stage index={2}>
          <Dumbbell color={PLATE_COLORS.blue} />
        </Stage>
        <Stage index={3} spin={0.35}>
          <PlateStack />
        </Stage>
        <Stage index={4}>
          <Dumbbell color={PLATE_COLORS.green} />
        </Stage>
        <Stage index={5}>
          <Kettlebell color={PLATE_COLORS.red} />
        </Stage>
        <Stage index={6} spin={0.18}>
          <Barbell />
        </Stage>
      </Canvas>
    </div>
  );
}
