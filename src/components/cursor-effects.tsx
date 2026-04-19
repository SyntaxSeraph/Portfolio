import { useEffect, useRef, useCallback } from "react";

/* ─── Sparkle particle on click ─── */
interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
}

export function CursorEffects() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Position refs for animation loop (avoids re-renders)
  const mouse = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const visible = useRef(false);
  const clicking = useRef(false);
  const hovering = useRef(false);
  const sparks = useRef<Spark[]>([]);
  const rafId = useRef<number>(0);

  /* ─── Spawn sparkles ─── */
  const spawnSparks = useCallback((x: number, y: number) => {
    const count = 8 + Math.floor(Math.random() * 6);
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const speed = 1.5 + Math.random() * 3;
      sparks.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 0.4 + Math.random() * 0.3,
        size: 2 + Math.random() * 3,
        hue: 280 + Math.random() * 60, // violet → blue range
      });
    }
  }, []);

  useEffect(() => {
    // Skip on touch devices
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const glow = glowRef.current;
    const canvas = canvasRef.current;
    if (!dot || !ring || !glow || !canvas) return;

    const ctx = canvas.getContext("2d")!;

    /* ── Sizing ── */
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* ── Mouse tracking ── */
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!visible.current) {
        visible.current = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
        glow.style.opacity = "1";
      }
    };

    const onDown = () => {
      clicking.current = true;
      spawnSparks(mouse.current.x, mouse.current.y);
    };
    const onUp = () => {
      clicking.current = false;
    };

    const onEnter = () => {
      visible.current = true;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
      glow.style.opacity = "1";
    };
    const onLeave = () => {
      visible.current = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
      glow.style.opacity = "0";
    };

    /* ── Hover detection for interactive elements ── */
    const onOverInteractive = () => {
      hovering.current = true;
    };
    const onOutInteractive = () => {
      hovering.current = false;
    };

    // Attach hover listeners to all interactive elements
    const interactiveSelector =
      'a, button, [role="button"], input, textarea, select, label, .cursor-magnetic';
    const attachHoverListeners = () => {
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.addEventListener("mouseenter", onOverInteractive);
        el.addEventListener("mouseleave", onOutInteractive);
      });
    };
    attachHoverListeners();
    // Re-attach on DOM changes
    const observer = new MutationObserver(() => {
      attachHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    /* ── Main animation loop ── */
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      // Smooth follow — dot follows tightly, ring lags behind
      pos.current.x = lerp(pos.current.x, mouse.current.x, 0.2);
      pos.current.y = lerp(pos.current.y, mouse.current.y, 0.2);
      ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.08);
      ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.08);

      const dotScale = clicking.current ? 0.6 : hovering.current ? 1.6 : 1;
      const ringScale = clicking.current ? 1.8 : hovering.current ? 2.2 : 1;

      dot.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%) scale(${dotScale})`;
      ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%) scale(${ringScale})`;
      glow.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;

      // Ring border animation on hover
      ring.style.borderColor = hovering.current
        ? "oklch(0.78 0.18 250 / 0.6)"
        : "oklch(0.68 0.22 295 / 0.35)";
      ring.style.borderWidth = hovering.current ? "2px" : "1.5px";

      // Glow intensity
      glow.style.opacity = visible.current ? (hovering.current ? "0.5" : "0.3") : "0";

      /* ── Sparkle particles ── */
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparks.current = sparks.current.filter((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.05; // gravity
        s.vx *= 0.98;
        s.life -= 1 / 60 / s.maxLife;

        if (s.life <= 0) return false;

        const alpha = s.life * 0.9;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = `oklch(0.78 0.18 ${s.hue})`;
        ctx.shadowColor = `oklch(0.68 0.22 ${s.hue})`;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        // Draw a small star/diamond shape
        const sz = s.size * s.life;
        ctx.moveTo(s.x, s.y - sz);
        ctx.lineTo(s.x + sz * 0.4, s.y);
        ctx.lineTo(s.x, s.y + sz);
        ctx.lineTo(s.x - sz * 0.4, s.y);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        return true;
      });

      /* ── Trailing cursor particles (subtle) ── */
      const dx = mouse.current.x - pos.current.x;
      const dy = mouse.current.y - pos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      if (speed > 3 && visible.current) {
        sparks.current.push({
          x: pos.current.x + (Math.random() - 0.5) * 8,
          y: pos.current.y + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          life: 1,
          maxLife: 0.2 + Math.random() * 0.15,
          size: 1.5 + Math.random() * 1.5,
          hue: 280 + Math.random() * 40,
        });
      }

      rafId.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);

    rafId.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId.current);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, [spawnSparks]);

  return (
    <>
      {/* Sparkle canvas — full viewport, behind cursor elements */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9997,
          pointerEvents: "none",
        }}
      />

      {/* Soft glow behind cursor */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, oklch(0.68 0.22 295 / 0.25), transparent 70%)",
          pointerEvents: "none",
          zIndex: 9998,
          opacity: 0,
          transition: "opacity 0.3s ease",
          willChange: "transform",
        }}
      />

      {/* Trailing ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1.5px solid oklch(0.68 0.22 295 / 0.35)",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0,
          transition: "width 0.3s, height 0.3s, border-color 0.3s, border-width 0.3s, opacity 0.3s",
          willChange: "transform",
        }}
      />

      {/* Dot cursor */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "oklch(0.78 0.18 250)",
          boxShadow: "0 0 10px 2px oklch(0.68 0.22 295 / 0.5)",
          pointerEvents: "none",
          zIndex: 10000,
          opacity: 0,
          transition: "opacity 0.3s, transform 0.15s ease-out",
          willChange: "transform",
        }}
      />
    </>
  );
}
