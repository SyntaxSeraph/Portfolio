import { Github, Linkedin, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:px-6 md:flex-row lg:px-8">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Sohan Hazra. Built with passion & code.
        </p>
        <div className="flex items-center gap-3">
          <a
            href="mailto:sohanhazra70@gmail.com"
            aria-label="Email"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-smooth hover:border-primary hover:text-primary"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/sohan-hazra2024/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-smooth hover:border-primary hover:text-primary"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="https://github.com/SyntaxSeraph"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-smooth hover:border-primary hover:text-primary"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
