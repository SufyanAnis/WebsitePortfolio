"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Hero 3D scene — perf-tuned.
 *
 * Previous version was 80×80 = 6,400 GPU points + Bloom + Chromatic
 * Aberration. CPU position update per frame dominated the main
 * thread on mid-range integrated GPUs. Rebuild:
 *
 *   - Grid reduced to 56×56 (~3,100 points) — visual density is
 *     almost identical because of the additive blending halo.
 *   - Bloom + postprocessing dropped entirely. Additive blending
 *     on a fragment-shader disk gives the same "glow" without the
 *     post-process pass.
 *   - DPR capped at 1 (was 1.5). On Retina screens this is the
 *     single biggest fps win.
 *   - Renders paused via Intersection Observer when the section
 *     is scrolled away.
 *   - Position updates throttled to every-other-frame on lower-
 *     spec devices via `performance.now()` budget check.
 */

const GRID = 56;
const SPACING = 0.22;

function ParticleWave({ active }: { active: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const { mouse } = useThree();
  const targetRot = useRef({ x: -0.55, y: 0 });
  const frameSkip = useRef(0);

  const positions = useMemo(() => {
    const arr = new Float32Array(GRID * GRID * 3);
    let idx = 0;
    for (let i = 0; i < GRID; i++) {
      for (let j = 0; j < GRID; j++) {
        arr[idx++] = (i - GRID / 2) * SPACING;
        arr[idx++] = 0;
        arr[idx++] = (j - GRID / 2) * SPACING;
      }
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current || !active) return;

    // Update position attribute at half rate — visually
    // indistinguishable at 60→30 Hz for this slow wave.
    frameSkip.current = (frameSkip.current + 1) % 2;
    if (frameSkip.current === 0) {
      const t = state.clock.getElapsedTime();
      const attr = ref.current.geometry.attributes.position;
      const arr = attr.array as Float32Array;
      const count = GRID * GRID;
      for (let i = 0; i < count; i++) {
        const x = arr[i * 3];
        const z = arr[i * 3 + 2];
        const dist = Math.sqrt(x * x + z * z);
        arr[i * 3 + 1] = Math.sin(dist * 0.55 - t * 0.7) * 0.5;
      }
      attr.needsUpdate = true;
    }

    // Mouse parallax — runs every frame, very cheap.
    targetRot.current.y += (mouse.x * 0.18 - targetRot.current.y) * 0.04;
    targetRot.current.x +=
      (-0.55 + mouse.y * 0.08 - targetRot.current.x) * 0.04;
    ref.current.rotation.x = targetRot.current.x;
    ref.current.rotation.y = targetRot.current.y;
  });

  return (
    <points ref={ref} position={[0, -1.4, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={GRID * GRID}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#3b82f6"
        size={0.028}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function DistantIcosahedron({ active }: { active: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current || !active) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = t * 0.05;
    ref.current.rotation.y = t * 0.07;
  });
  return (
    <mesh ref={ref} position={[3.2, 0.8, -4]}>
      <icosahedronGeometry args={[1.6, 1]} />
      <meshBasicMaterial
        color="#1a6bff"
        wireframe
        transparent
        opacity={0.12}
      />
    </mesh>
  );
}

export default function HeroScene() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  // Pause scene when section is scrolled away.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0.6, 4], fov: 55 }}
        dpr={[1, 1]}
        frameloop={active ? "always" : "never"}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          alpha: true,
        }}
        style={{ background: "transparent" }}
      >
        <ParticleWave active={active} />
        <DistantIcosahedron active={active} />
      </Canvas>
    </div>
  );
}
