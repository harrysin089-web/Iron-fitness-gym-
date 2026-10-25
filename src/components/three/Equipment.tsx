"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const PLATE_COLORS = {
  red: "#D7263D",
  blue: "#1F5FBF",
  yellow: "#F2C230",
  green: "#2E9E5B",
  iron: "#2A2D32",
  steel: "#9AA0A8",
};

const SCHEMES: string[][] = [
  [PLATE_COLORS.red, PLATE_COLORS.blue, PLATE_COLORS.yellow, PLATE_COLORS.green],
  [PLATE_COLORS.blue, PLATE_COLORS.blue, PLATE_COLORS.green, PLATE_COLORS.green],
  [PLATE_COLORS.iron, PLATE_COLORS.steel, PLATE_COLORS.iron, PLATE_COLORS.steel],
  [PLATE_COLORS.yellow, PLATE_COLORS.red, PLATE_COLORS.yellow, PLATE_COLORS.red],
];

const PLATE_SPEC = [
  { r: 1.05, t: 0.2 },
  { r: 1.05, t: 0.2 },
  { r: 0.82, t: 0.16 },
  { r: 0.55, t: 0.12 },
];

function Steel({ color = PLATE_COLORS.steel }: { color?: string }) {
  return <meshStandardMaterial color={color} metalness={1} roughness={0.28} />;
}

type PlateProps = {
  x: number;
  r: number;
  t: number;
  color: string;
  dir: 1 | -1;
  delay: number;
  intro: boolean;
};

/** One bumper plate. Lies on the x axis; slides onto the sleeve during the intro. */
function Plate({ x, r, t, color, dir, delay, intro }: PlateProps) {
  const g = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!g.current) return;
    let e = 1;
    if (intro) {
      const k = THREE.MathUtils.clamp((state.clock.elapsedTime - delay) / 1.1, 0, 1);
      e = 1 - Math.pow(1 - k, 4);
    }
    g.current.position.x = dir * (x + (1 - e) * 9);
  });

  return (
    <group ref={g}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[r, r, t, 64]} />
        <meshStandardMaterial color={color} roughness={0.55} metalness={0.15} />
      </mesh>
      {/* steel hub */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, t + 0.02, 32]} />
        <Steel />
      </mesh>
      {/* inner ring */}
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[r * 0.72, 0.014, 12, 64]} />
        <meshStandardMaterial color="#ECEBE6" roughness={0.4} />
      </mesh>
    </group>
  );
}

/** Olympic barbell, loaded with plates. Click to swap the colour scheme. */
export function Barbell({ intro = false }: { intro?: boolean }) {
  const [scheme, setScheme] = useState(0);
  const colors = SCHEMES[scheme];

  const plates: { x: number; spec: (typeof PLATE_SPEC)[number]; color: string; delay: number }[] = [];
  let cursor = 1.55;
  PLATE_SPEC.forEach((spec, i) => {
    plates.push({ x: cursor + spec.t / 2, spec, color: colors[i], delay: 0.5 + i * 0.28 });
    cursor += spec.t + 0.025;
  });
  const collarX = cursor + 0.07;

  return (
    <group
      onClick={(e) => {
        e.stopPropagation();
        setScheme((s) => (s + 1) % SCHEMES.length);
      }}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "")}
    >
      {/* shaft */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.045, 0.045, 7.6, 24]} />
        <Steel />
      </mesh>
      {/* grip rings */}
      {[-0.6, 0.6].map((x) => (
        <mesh key={x} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.055, 0.055, 0.1, 24]} />
          <Steel color="#6E747C" />
        </mesh>
      ))}
      {/* sleeves */}
      {([-1, 1] as const).map((dir) => (
        <group key={dir}>
          <mesh position={[dir * 2.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.075, 0.075, 2.4, 32]} />
            <Steel color="#B8BDC4" />
          </mesh>
          {plates.map((p, i) => (
            <Plate
              key={i}
              x={p.x}
              r={p.spec.r}
              t={p.spec.t}
              color={p.color}
              dir={dir}
              delay={p.delay}
              intro={intro}
            />
          ))}
          <mesh position={[dir * collarX, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.13, 0.13, 0.14, 32]} />
            <Steel color="#3A3E44" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/** Competition kettlebell; the body colour encodes its weight, as on a real one. */
export function Kettlebell({ color = PLATE_COLORS.yellow }: { color?: string }) {
  return (
    <group scale={1.25}>
      <mesh position={[0, -0.05, 0]} scale={[1, 0.94, 1]}>
        <sphereGeometry args={[0.7, 48, 48]} />
        <meshStandardMaterial color={color} roughness={0.45} metalness={0.35} />
      </mesh>
      <mesh position={[0, -0.72, 0]}>
        <cylinderGeometry args={[0.42, 0.46, 0.1, 40]} />
        <meshStandardMaterial color={PLATE_COLORS.iron} roughness={0.6} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <torusGeometry args={[0.38, 0.085, 20, 48, Math.PI]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.4} />
      </mesh>
      <mesh position={[-0.38, 0.5, 0]}>
        <sphereGeometry args={[0.085, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.4} />
      </mesh>
      <mesh position={[0.38, 0.5, 0]}>
        <sphereGeometry args={[0.085, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.4} />
      </mesh>
      {/* weight disc on the front */}
      <mesh position={[0, -0.05, 0.69]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.02, 32]} />
        <meshStandardMaterial color="#ECEBE6" roughness={0.5} />
      </mesh>
    </group>
  );
}

/** Hex dumbbell with colour-coded end caps. */
export function Dumbbell({ color = PLATE_COLORS.blue }: { color?: string }) {
  return (
    <group rotation={[0.2, 0, -0.35]} scale={1.2}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.1, 0.1, 1.9, 24]} />
        <Steel color="#6E747C" />
      </mesh>
      {([-1, 1] as const).map((d) => (
        <group key={d} position={[d * 0.85, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.52, 0.52, 0.46, 6]} />
            <meshStandardMaterial color={PLATE_COLORS.iron} roughness={0.5} metalness={0.7} />
          </mesh>
          <mesh position={[d * 0.24, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.3, 0.3, 0.04, 32]} />
            <meshStandardMaterial color={color} roughness={0.4} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/** Plates stacked on a loading pin. */
export function PlateStack() {
  const stack = [
    { r: 1.05, c: PLATE_COLORS.red },
    { r: 1.0, c: PLATE_COLORS.blue },
    { r: 0.92, c: PLATE_COLORS.yellow },
    { r: 0.85, c: PLATE_COLORS.green },
    { r: 0.7, c: PLATE_COLORS.iron },
  ];
  return (
    <group rotation={[0.25, 0, 0]}>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 2.2, 20]} />
        <Steel />
      </mesh>
      {stack.map((p, i) => (
        <group key={i} position={[0, -0.72 + i * 0.26, 0]} rotation={[0, i * 0.4, 0]}>
          <mesh>
            <cylinderGeometry args={[p.r, p.r, 0.22, 64]} />
            <meshStandardMaterial color={p.c} roughness={0.55} metalness={0.15} />
          </mesh>
          <mesh position={[0, 0.115, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 0.02, 24]} />
            <Steel />
          </mesh>
        </group>
      ))}
    </group>
  );
}
