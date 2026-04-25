import { useEffect, useRef } from 'react'
import './ScrollEffects.css'

export default function ScrollEffects() {
  const barRef = useRef(null)

  useEffect(() => {
    // ── 1. SCROLL PROGRESS BAR ─────────────────────────────────────────
    const bar = barRef.current
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100
      if (bar) bar.style.width = `${pct}%`
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // ── 2. 3D TILT ON CARDS (mouse-move within card) ───────────────────
    const tiltEls = document.querySelectorAll(
      '.skill-card, .service-card, .about-3d-card, .project-card, .cl-item'
    )
    const tiltHandlers = []
    tiltEls.forEach(el => {
      const onEnter = () => el.classList.add('tilt-active')
      const onLeave = () => {
        el.classList.remove('tilt-active')
        el.style.transform = ''
      }
      const onMove = (e) => {
        const r = el.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width  - 0.5   // -0.5 → 0.5
        const y = (e.clientY - r.top)  / r.height - 0.5
        const maxTilt = 12
        el.style.transform = `
          perspective(700px)
          rotateX(${-y * maxTilt}deg)
          rotateY(${x  * maxTilt}deg)
          translateZ(8px)
        `
      }
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
      el.addEventListener('mousemove',  onMove)
      tiltHandlers.push({ el, onEnter, onLeave, onMove })
    })

    // ── 3. PARALLAX LAYERS on scroll ──────────────────────────────────
    const heroGrid    = document.querySelector('.hero-grid')
    const orb1        = document.querySelector('.orb1')
    const orb2        = document.querySelector('.orb2')
    const skillsOrb   = document.querySelector('.skills-orb')
    const projectsOrb = document.querySelector('.projects-orb')

    const onParallax = () => {
      const sy = window.scrollY
      if (heroGrid)    heroGrid.style.transform    = `translateY(${sy * 0.25}px)`
      if (orb1)        orb1.style.transform        = `translateY(${sy * 0.18}px)`
      if (orb2)        orb2.style.transform        = `translateY(${-sy * 0.12}px)`
      if (skillsOrb)   skillsOrb.style.transform   = `translateY(${sy * 0.06}px)`
      if (projectsOrb) projectsOrb.style.transform = `translateY(${-sy * 0.05}px)`
    }
    window.addEventListener('scroll', onParallax, { passive: true })

    // ── 4. 3D SECTION ENTRANCE — rotate + scale from depth ────────────
    const sections = document.querySelectorAll('section:not(#home)')
    const sectionObs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('section-entered')
          } else {
            e.target.classList.remove('section-entered')
          }
        })
      },
      { threshold: 0.08 }
    )
    sections.forEach(s => sectionObs.observe(s))

    // ── 5. FLOATING SCROLL SPARKS ──────────────────────────────────────
    let lastScrollY = window.scrollY
    let sparkThrottle = 0

    const spawnSpark = (x, y) => {
      const spark = document.createElement('div')
      spark.className = 'scroll-spark'
      const angle  = Math.random() * 360
      const dist   = 30 + Math.random() * 60
      const hue    = Math.random() > 0.5 ? '165' : '270'  // teal or purple
      spark.style.cssText = `
        left:${x + (Math.random()-0.5)*60}px;
        top:${y}px;
        --angle:${angle}deg;
        --dist:${dist}px;
        --hue:${hue};
      `
      document.body.appendChild(spark)
      setTimeout(() => spark.remove(), 900)
    }

    const onScrollSpark = () => {
      const now = Date.now()
      if (now - sparkThrottle < 120) return
      sparkThrottle = now
      const dy = Math.abs(window.scrollY - lastScrollY)
      if (dy > 5) {
        const count = Math.min(3, Math.floor(dy / 15) + 1)
        for (let i = 0; i < count; i++) {
          spawnSpark(
            window.innerWidth  * 0.5 + (Math.random() - 0.5) * window.innerWidth * 0.8,
            window.innerHeight * 0.5 + (Math.random() - 0.5) * window.innerHeight * 0.5
          )
        }
      }
      lastScrollY = window.scrollY
    }
    window.addEventListener('scroll', onScrollSpark, { passive: true })

    // ── 6. MAGNETIC BUTTONS ───────────────────────────────────────────
    const magnetics = document.querySelectorAll('.btn-primary, .btn-secondary, .form-submit, .proj-btn')
    const magHandlers = []
    magnetics.forEach(el => {
      const onMove = (e) => {
        const r   = el.getBoundingClientRect()
        const cx  = r.left + r.width  / 2
        const cy  = r.top  + r.height / 2
        const dx  = (e.clientX - cx) * 0.35
        const dy  = (e.clientY - cy) * 0.35
        el.style.transform = `translate(${dx}px, ${dy}px)`
      }
      const onLeave = () => { el.style.transform = '' }
      el.addEventListener('mousemove',  onMove)
      el.addEventListener('mouseleave', onLeave)
      magHandlers.push({ el, onMove, onLeave })
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('scroll', onParallax)
      window.removeEventListener('scroll', onScrollSpark)
      sectionObs.disconnect()
      tiltHandlers.forEach(({ el, onEnter, onLeave, onMove }) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
        el.removeEventListener('mousemove',  onMove)
      })
      magHandlers.forEach(({ el, onMove, onLeave }) => {
        el.removeEventListener('mousemove',  onMove)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      {/* Scroll progress bar */}
      <div className="scroll-progress-bar" ref={barRef} />
    </>
  )
}
