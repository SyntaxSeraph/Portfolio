import { GraduationCap, Lightbulb, Target, Zap } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const highlights = [
  { icon: Lightbulb, title: "Curious Mind", text: "Always exploring new tools, frameworks and ideas." },
  { icon: Target, title: "Problem Solver", text: "I love breaking down complex problems into elegant solutions." },
  { icon: Zap, title: "Quick Learner", text: "Adapt fast — pick up new stacks and ship quickly." },
];

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="About me"
          title="A passionate developer in the making"
          description="I'm Sohan, a tech enthusiast who turns ideas into working products."
        />

        <div className="mt-16 grid items-start gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3 animate-fade-up">
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>
                Hi! I'm <span className="font-semibold text-foreground">Sohan Hazra</span>,
                a 3rd-year B.Tech Computer Science student at{" "}
                <span className="font-semibold text-foreground">VIT Vellore</span>. I'm
                deeply passionate about coding, problem solving, and building things that
                make people's lives easier.
              </p>
              <p>
                My journey in tech has been driven by curiosity — I enjoy diving into new
                technologies, experimenting with ideas, and shipping projects from idea to
                deployment. I'm particularly drawn to full-stack web development, where
                I can craft both delightful user experiences and robust back-end systems.
              </p>
              <p>
                Outside of coursework, I love working on side projects, learning from the
                dev community, and constantly leveling up my skill set.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {highlights.map(({ icon: Icon, title, text }) => (
                <div key={title} className="glass rounded-xl p-5 transition-smooth hover:-translate-y-1 hover:shadow-elegant">
                  <Icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-3 font-semibold">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 animate-fade-up" style={{ animationDelay: "150ms" }}>
            <div className="glass rounded-2xl p-6 shadow-card">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
                  <GraduationCap className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Education</p>
                  <h3 className="font-display text-lg font-semibold">VIT Vellore</h3>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <div className="rounded-lg border border-border p-4">
                  <p className="text-sm font-semibold">B.Tech in Computer Science</p>
                  <p className="mt-1 text-xs text-muted-foreground">2022 — 2026 · 3rd Year</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Strong foundation in programming, data structures, algorithms, and
                    software engineering.
                  </p>
                </div>
                <div className="rounded-lg border border-dashed border-border p-4">
                  <p className="text-xs uppercase tracking-wider text-primary">Focus areas</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {["Full Stack", "Web Apps", "Problem Solving", "DSA"].map((t) => (
                      <span key={t} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
