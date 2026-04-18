import { Layout, Smartphone, Server, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { TiltCard } from "@/components/tilt-card";

const services: { icon: LucideIcon; title: string; desc: string; bullets: string[] }[] = [
  {
    icon: Layout,
    title: "Responsive Web Design",
    desc: "Beautiful, fast websites that look great on every device.",
    bullets: ["Mobile-first layouts", "Modern UI patterns", "Performance focused"],
  },
  {
    icon: Smartphone,
    title: "User-Friendly Interfaces",
    desc: "Clean, intuitive UI that delights users and drives engagement.",
    bullets: ["Accessible design", "Smooth interactions", "Polished UX"],
  },
  {
    icon: Server,
    title: "Full-Stack Applications",
    desc: "End-to-end web apps with robust APIs and reliable databases.",
    bullets: ["REST APIs", "Auth & data models", "Deployment ready"],
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="What I do"
          title="Services I Offer"
          description="I help bring your ideas online with thoughtful design and clean code."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, desc, bullets }, idx) => (
            <TiltCard
              key={title}
              className="glass group relative overflow-hidden rounded-2xl p-7 hover:shadow-elegant animate-fade-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-primary opacity-0 blur-3xl transition-smooth group-hover:opacity-30" />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                <ul className="mt-5 space-y-2">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm">
                      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-muted-foreground">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
