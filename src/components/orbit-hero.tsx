import sohanHero from "@/assets/sohan-hero.png";

type Logo = { name: string; src: string };

// Official tech logos via simpleicons CDN (SVG, color)
const logo = (slug: string, color: string) =>
  `https://cdn.simpleicons.org/${slug}/${color}`;

const innerLogos: Logo[] = [
  { name: "React", src: logo("react", "61DAFB") },
  { name: "TypeScript", src: logo("typescript", "3178C6") },
  { name: "Python", src: logo("python", "3776AB") },
  { name: "Java", src: logo("openjdk", "ED8B00") },
  { name: "JavaScript", src: logo("javascript", "F7DF1E") },
  { name: "C", src: logo("c", "A8B9CC") },
];

const outerLogos: Logo[] = [
  { name: "Node.js", src: logo("nodedotjs", "5FA04E") },
  { name: "HTML5", src: logo("html5", "E34F26") },
  { name: "CSS3", src: logo("css3", "1572B6") },
  { name: "Tailwind", src: logo("tailwindcss", "06B6D4") },
  { name: "Git", src: logo("git", "F05032") },
  { name: "GitHub", src: logo("github", "FFFFFF") },
  { name: "MongoDB", src: logo("mongodb", "47A248") },
  { name: "MySQL", src: logo("mysql", "4479A1") },
];

function Orbit({
  logos,
  radius,
  duration,
  reverse = false,
  size,
}: {
  logos: Logo[];
  radius: number;
  duration: number;
  reverse?: boolean;
  size: number;
}) {
  return (
    <div
      className="absolute inset-0"
      style={{
        animation: `orbit-spin ${duration}s linear infinite${reverse ? " reverse" : ""}`,
      }}
    >
      {logos.map((l, i) => {
        const angle = (i / logos.length) * 2 * Math.PI;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <div
            key={l.name}
            className="absolute left-1/2 top-1/2"
            style={{
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
            }}
          >
            <div
              className="glass flex items-center justify-center rounded-full p-2 shadow-card transition-smooth hover:scale-110"
              style={{
                width: size,
                height: size,
                animation: `orbit-spin ${duration}s linear infinite${reverse ? "" : " reverse"}`,
              }}
              title={l.name}
            >
              <img
                src={l.src}
                alt={l.name}
                width={size - 16}
                height={size - 16}
                loading="lazy"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function OrbitHero() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      {/* Glow */}
      <div className="absolute inset-0 -z-10 animate-float rounded-full bg-gradient-primary opacity-30 blur-3xl" />

      {/* Static orbit rings (decorative) */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30"
        style={{ width: "62%", height: "62%" }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-accent/30"
        style={{ width: "92%", height: "92%" }}
      />

      {/* Orbiting logos */}
      <Orbit logos={innerLogos} radius={150} duration={28} size={48} />
      <Orbit logos={outerLogos} radius={222} duration={42} reverse size={52} />

      {/* Portrait — centered in the middle of the orbit circles */}
      <img
        src={sohanHero}
        alt="Sohan Hazra portrait"
        width={1024}
        height={1024}
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[58%] max-w-none -translate-x-1/2 -translate-y-1/2 select-none drop-shadow-[0_25px_40px_rgba(0,0,0,0.65)]"
        draggable={false}
      />

      {/* Status pill */}
      <div className="glass absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2 text-xs font-medium shadow-card">
        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
        VIT Vellore · CSE '26
      </div>
    </div>
  );
}
