import { useState, type FormEvent } from "react";
import { Mail, Linkedin, Github, Send, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const channels: { icon: LucideIcon; label: string; value: string; href: string }[] = [
  {
    icon: Mail,
    label: "Email",
    value: "sohanhazra70@gmail.com",
    href: "mailto:sohanhazra70@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "sohan-hazra2024",
    href: "https://www.linkedin.com/in/sohan-hazra2024/",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "SyntaxSeraph",
    href: "https://github.com/SyntaxSeraph",
  },
];

export function ContactSection() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:sohanhazra70@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="Let's connect"
          title="Get in Touch"
          description="Have a project in mind, an opportunity, or just want to say hi? My inbox is open."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            {channels.map(({ icon: Icon, label, value, href }, idx) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="glass group flex items-center gap-4 rounded-xl p-5 transition-smooth hover:-translate-y-0.5 hover:shadow-elegant animate-fade-up"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-smooth group-hover:bg-gradient-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
                  <p className="truncate font-medium">{value}</p>
                </div>
              </a>
            ))}
          </div>

          <form
            onSubmit={onSubmit}
            className="glass space-y-4 rounded-2xl p-6 shadow-card lg:col-span-3 animate-fade-up"
            style={{ animationDelay: "150ms" }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  placeholder="Your name"
                  className="w-full rounded-lg border border-border bg-background/60 px-4 py-2.5 text-sm outline-none transition-smooth focus:border-primary focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@email.com"
                  className="w-full rounded-lg border border-border bg-background/60 px-4 py-2.5 text-sm outline-none transition-smooth focus:border-primary focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                placeholder="Tell me about your idea or opportunity..."
                className="w-full resize-none rounded-lg border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-smooth focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-smooth hover:scale-[1.01] sm:w-auto"
            >
              {sent ? (
                <>
                  <Check className="h-4 w-4" /> Opened your mail app
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
