import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({
  position,
  color,
  scale = 1,
  speed = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={2} position={position}>
      <Icosahedron args={[scale, 1]}>
        <MeshDistortMaterial
          color={color}
          distort={0.4}
          speed={1.5}
          roughness={0.2}
          metalness={0.6}
          emissive={color}
          emissiveIntensity={0.25}
        />
      </Icosahedron>
    </Float>
  );
}

function ScrollCamera() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useFrame(({ camera }) => {
    const target = scrollY * 0.0015;
    camera.position.y += (-target - camera.position.y) * 0.05;
    camera.rotation.x += (target * 0.1 - camera.rotation.x) * 0.05;
  });
  return null;
}

function Scene() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.05;
  });
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={50} color="#a78bfa" />
      <pointLight position={[-10, -5, -5]} intensity={40} color="#22d3ee" />
      <group ref={group}>
        <FloatingShape position={[-5, 2, -3]} color="#7c3aed" scale={0.9} speed={1.2} />
        <FloatingShape position={[5, -1, -4]} color="#22d3ee" scale={1.1} speed={0.9} />
        <FloatingShape position={[-3, -4, -2]} color="#a78bfa" scale={0.7} speed={1.5} />
        <FloatingShape position={[4, 4, -5]} color="#06b6d4" scale={0.8} speed={1.1} />
        <FloatingShape position={[0, -7, -3]} color="#8b5cf6" scale={1.0} speed={0.8} />
        <FloatingShape position={[-6, -8, -4]} color="#7c3aed" scale={0.6} speed={1.3} />
        <FloatingShape position={[6, -10, -3]} color="#22d3ee" scale={0.9} speed={1.0} />
      </group>
      <Stars radius={30} depth={50} count={1500} factor={4} fade speed={0.5} />
      <ScrollCamera />
    </>
  );
}

export function SceneBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden="true"
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
