import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Mail, Sparkles, Code2, Rocket } from "lucide-react";
import { OrbitHero } from "@/components/orbit-hero";
import { TypingText } from "@/components/typing-text";
import { AboutSection } from "@/components/sections/about-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ServicesSection } from "@/components/sections/services-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ContactSection } from "@/components/sections/contact-section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sohan Hazra — Tech Enthusiast & Full Stack Developer" },
      {
        name: "description",
        content:
          "Hi, I'm Sohan Hazra — a B.Tech CSE student at VIT Vellore building modern full-stack web experiences.",
      },
      { property: "og:title", content: "Sohan Hazra — Portfolio" },
      {
        property: "og:description",
        content: "Tech Enthusiast | Problem Solver | Passionate about Coding.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <section id="home" className="relative overflow-hidden scroll-mt-20">
        {/* Decorative gradient blobs */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        </div>

        <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          {/* Text */}
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Available for opportunities
            </div>

            <h1 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Hi, I'm <span className="text-gradient">Sohan Hazra</span>
            </h1>

            <p className="mt-4 text-xl font-medium text-muted-foreground sm:text-2xl">
              I'm a{" "}
              <TypingText
                className="text-foreground"
                words={[
                  "Tech Enthusiast",
                  "Problem Solver",
                  "Full Stack Developer",
                  "Passionate Coder",
                ]}
              />
            </p>

            <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
              A motivated Computer Science student at VIT Vellore focused on building
              innovative, efficient web solutions — from idea to deployment.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-smooth hover:scale-[1.02]"
              >
                View Projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/50 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition-smooth hover:border-primary hover:bg-card"
              >
                <Mail className="h-4 w-4" />
                Contact Me
              </a>
            </div>

            <div className="mt-10 grid max-w-md grid-cols-3 gap-4">
              {[
                { icon: Code2, label: "Full Stack" },
                { icon: Rocket, label: "Innovation" },
                { icon: Sparkles, label: "Quick Learner" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="glass flex flex-col items-center gap-2 rounded-xl px-3 py-4 text-center"
                >
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="text-xs font-medium text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Orbit Hero */}
          <div className="animate-fade-up" style={{ animationDelay: "150ms" }}>
            <OrbitHero />
          </div>
        </div>
      </section>

      <AboutSection />
      <SkillsSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
