import {
  Code,
  Coffee,
  FileCode2,
  Globe,
  Layers,
  Server,
  Database,
  GitBranch,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

type Skill = { name: string; level: number; icon: LucideIcon };

const languages: Skill[] = [
  { name: "C", level: 85, icon: FileCode2 },
  { name: "Java", level: 80, icon: Coffee },
  { name: "Python", level: 82, icon: Code },
];

const stack: Skill[] = [
  { name: "Full Stack Web", level: 85, icon: Layers },
  { name: "Frontend (HTML/CSS/JS)", level: 88, icon: Globe },
  { name: "Backend & APIs", level: 78, icon: Server },
  { name: "Databases", level: 75, icon: Database },
  { name: "Git & GitHub", level: 85, icon: GitBranch },
];

function SkillCard({ name, level, icon: Icon }: Skill) {
  return (
    <div className="glass group rounded-xl p-5 transition-smooth hover:-translate-y-1 hover:shadow-elegant">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-primary transition-smooth group-hover:bg-gradient-primary group-hover:text-primary-foreground">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="font-semibold">{name}</span>
            <span className="text-xs font-medium text-muted-foreground">{level}%</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-gradient-primary transition-all duration-700"
              style={{ width: `${level}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="My toolkit"
          title="Skills & Technologies"
          description="A growing toolbox of languages, frameworks and tools I use to bring ideas to life."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div className="animate-fade-up">
            <h3 className="mb-5 font-display text-xl font-semibold">Programming Languages</h3>
            <div className="grid gap-3">
              {languages.map((s) => (
                <SkillCard key={s.name} {...s} />
              ))}
            </div>
          </div>
          <div className="animate-fade-up" style={{ animationDelay: "120ms" }}>
            <h3 className="mb-5 font-display text-xl font-semibold">Web Development</h3>
            <div className="grid gap-3">
              {stack.map((s) => (
                <SkillCard key={s.name} {...s} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
