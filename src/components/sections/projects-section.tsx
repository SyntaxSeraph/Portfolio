import { ExternalLink, Github, Hospital, Stethoscope, Calendar, Ticket } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

export function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="My work"
          title="Featured Projects"
          description="A selection of things I've built. More coming soon."
        />

        <div className="mt-14 grid gap-8">
          <article className="glass group grid gap-8 overflow-hidden rounded-2xl p-2 transition-smooth hover:shadow-elegant lg:grid-cols-2 animate-fade-up">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 via-card to-accent/20 p-8">
              <div className="absolute inset-0 -z-10 opacity-30">
                <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-primary blur-3xl" />
                <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-accent blur-3xl" />
              </div>
              <div className="grid h-full grid-cols-2 gap-3">
                {[
                  { icon: Hospital, label: "Hospital Portal" },
                  { icon: Stethoscope, label: "Doctors" },
                  { icon: Calendar, label: "Appointments" },
                  { icon: Ticket, label: "Live Tokens" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="glass flex flex-col items-center justify-center gap-2 rounded-xl p-5 text-center transition-smooth group-hover:-translate-y-0.5"
                  >
                    <Icon className="h-7 w-7 text-primary" />
                    <span className="text-xs font-medium text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col p-6 lg:p-8">
              <div className="flex flex-wrap items-center gap-2">
                {["Full Stack", "Web App", "Healthcare"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold sm:text-3xl">
                Hospital Management System
              </h3>
              <p className="mt-3 text-muted-foreground">
                A full-stack platform that streamlines hospital operations with separate
                portals for hospitals and patients. Hospitals can register, manage doctors
                and schedules, while patients can book appointments in real time.
              </p>
              <ul className="mt-5 space-y-2 text-sm">
                {[
                  "Hospital registration & doctor management",
                  "Real-time appointment booking",
                  "Dynamic token system that updates live to reduce wait time",
                  "Separate dashboards for hospitals and patients",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2 text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-primary" />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap gap-3 pt-6">
                <a
                  href="https://github.com/SyntaxSeraph"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/50 px-4 py-2 text-sm font-semibold transition-smooth hover:border-primary hover:bg-card"
                >
                  <Github className="h-4 w-4" />
                  View Code
                </a>
                <a
                  href="https://github.com/SyntaxSeraph"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition-smooth hover:scale-[1.02]"
                >
                  Live Demo
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </article>

          <div className="glass flex flex-col items-center justify-center gap-2 rounded-2xl border-dashed p-12 text-center animate-fade-up" style={{ animationDelay: "150ms" }}>
            <p className="font-display text-lg font-semibold">More projects coming soon</p>
            <p className="text-sm text-muted-foreground">
              I'm always building. Check back — or follow my{" "}
              <a
                href="https://github.com/SyntaxSeraph"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                GitHub
              </a>{" "}
              for the latest.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
