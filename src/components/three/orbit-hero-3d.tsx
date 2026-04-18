import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, Float, Environment, Stars } from "@react-three/drei";
import * as THREE from "three";
import sohanHero from "@/assets/sohan-hero.png";

const logoUrl = (slug: string, color: string) =>
  `https://cdn.simpleicons.org/${slug}/${color}`;

function useSafeTexture(url: string): THREE.Texture | null {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  useEffect(() => {
    let cancelled = false;
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    loader.load(
      url,
      (tex) => {
        if (cancelled) return;
        tex.colorSpace = THREE.SRGBColorSpace;
        setTexture(tex);
      },
      undefined,
      () => {}
    );
    return () => {
      cancelled = true;
    };
  }, [url]);
  return texture;
}

const innerLogos = [
  { name: "React", url: logoUrl("react", "61DAFB") },
  { name: "TypeScript", url: logoUrl("typescript", "3178C6") },
  { name: "Python", url: logoUrl("python", "3776AB") },
  { name: "Java", url: logoUrl("openjdk", "ED8B00") },
  { name: "JavaScript", url: logoUrl("javascript", "F7DF1E") },
  { name: "C", url: logoUrl("c", "A8B9CC") },
];

const outerLogos = [
  { name: "Node.js", url: logoUrl("nodedotjs", "5FA04E") },
  { name: "HTML5", url: logoUrl("html5", "E34F26") },
  { name: "CSS3", url: logoUrl("css3", "1572B6") },
  { name: "Tailwind", url: logoUrl("tailwindcss", "06B6D4") },
  { name: "Git", url: logoUrl("git", "F05032") },
  { name: "GitHub", url: logoUrl("github", "FFFFFF") },
  { name: "MongoDB", url: logoUrl("mongodb", "47A248") },
  { name: "MySQL", url: logoUrl("mysql", "4479A1") },
];

function LogoBadge({ url }: { url: string }) {
  const texture = useSafeTexture(url);
  return (
    <Billboard>
      <mesh>
        <circleGeometry args={[0.26, 48]} />
        <meshPhysicalMaterial
          color="#1a1530"
          transmission={0.6}
          thickness={0.4}
          roughness={0.25}
          metalness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.2}
        />
      </mesh>
      {texture ? (
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[0.34, 0.34]} />
          <meshBasicMaterial map={texture} transparent toneMapped={false} />
        </mesh>
      ) : (
        <mesh position={[0, 0, 0.01]}>
          <circleGeometry args={[0.11, 32]} />
          <meshBasicMaterial color="#a78bfa" toneMapped={false} />
        </mesh>
      )}
    </Billboard>
  );
}

function Ring({
  logos,
  radius,
  speed,
  tilt,
  reverse = false,
}: {
  logos: { name: string; url: string }[];
  radius: number;
  speed: number;
  tilt: number;
  reverse?: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * speed * (reverse ? -1 : 1);
  });
  return (
    <group rotation={[tilt, 0, 0]}>
      <group ref={group}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.008, 8, 128]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.25} />
        </mesh>
        {logos.map((l, i) => {
          const angle = (i / logos.length) * Math.PI * 2;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          return (
            <group key={l.name} position={[x, 0, z]}>
              <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
                <LogoBadge url={l.url} />
              </Float>
            </group>
          );
        })}
      </group>
    </group>
  );
}

function Scene() {
  const root = useRef<THREE.Group>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setPointer({ x, y });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(() => {
    if (root.current) {
      root.current.rotation.y += (pointer.x * 0.4 - root.current.rotation.y) * 0.05;
      root.current.rotation.x += (-pointer.y * 0.2 - root.current.rotation.x) * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 4]} intensity={40} color="#a78bfa" />
      <pointLight position={[-4, -2, -3]} intensity={25} color="#22d3ee" />
      <directionalLight position={[0, 5, 5]} intensity={1} />
      <group ref={root}>
        <Ring logos={innerLogos} radius={2.6} speed={0.35} tilt={0.45} />
        <Ring logos={outerLogos} radius={3.4} speed={0.22} tilt={-0.35} reverse />
      </group>
      <Stars radius={20} depth={30} count={800} factor={3} fade speed={0.6} />
      <Environment preset="city" />
    </>
  );
}

export function OrbitHero3D() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[680px]">
      {/* Soft glow */}
      <div className="absolute inset-0 -z-10 animate-float rounded-full bg-gradient-primary opacity-30 blur-3xl" />

      {/* Concentric decorative circles behind everything (like reference) */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40"
        style={{ width: "70%", height: "70%" }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/25"
        style={{ width: "85%", height: "85%" }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-accent/25"
        style={{ width: "100%", height: "100%" }}
      />

      {/* 3D orbiting logos — sits BEHIND the portrait */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0.2, 8.5], fov: 45 }} dpr={[1, 2]}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Portrait — large, in front, no frame (matches reference) */}
      <img
        src={sohanHero}
        alt="Sohan Hazra portrait"
        width={1024}
        height={1024}
        className="pointer-events-none absolute left-1/2 bottom-0 z-10 w-[88%] max-w-none -translate-x-1/2 select-none drop-shadow-[0_25px_40px_rgba(0,0,0,0.65)]"
        draggable={false}
      />

      {/* Status pill */}
      <div className="glass absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2 text-xs font-medium shadow-card">
        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
        VIT Vellore · CSE '26
      </div>
    </div>
  );
}
