import { useEffect, useRef, useState } from 'react'
import './Hero.css'
import sohanImg from '/sohan.png'

const ROLES = [
  'Full Stack Developer',
  'Problem Solver',
  'CS Engineer',
  'Web Innovator',
  'Code Architect',
]

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [cursor, setCursor] = useState(true)
  const timeoutRef = useRef(null)

  // Typing effect
  useEffect(() => {
    const current = ROLES[roleIdx]
    if (!deleting && displayed.length < current.length) {
      timeoutRef.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === current.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && displayed.length > 0) {
      timeoutRef.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIdx((i) => (i + 1) % ROLES.length)
    }
    return () => clearTimeout(timeoutRef.current)
  }, [displayed, deleting, roleIdx])

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setCursor(c => !c), 530)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="home" className="hero-section">
      <div className="hero-bg-orb orb1" />
      <div className="hero-bg-orb orb2" />
      <div className="hero-grid" />

      <div className="container hero-container">
        {/* Text side */}
        <div className="hero-text">
          <div className="hero-badge">
            <span className="badge-dot" />
            Available for opportunities
          </div>

          <h1 className="hero-title">
            Hi, I'm <br />
            <span className="hero-name">Sohan Hazra</span>
          </h1>

          <div className="hero-role">
            <span className="role-prefix">&gt; </span>
            <span className="role-text">{displayed}</span>
            <span className={`type-cursor ${cursor ? 'visible' : 'hidden'}`}>|</span>
          </div>

          <p className="hero-intro">
            A motivated Computer Science student focused on building
            innovative web solutions — bridging creativity with code.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn-primary" onClick={e => { e.preventDefault(); document.getElementById('projects').scrollIntoView({ behavior: 'smooth' }) }}>
              <span>View Projects</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#contact" className="btn-secondary" onClick={e => { e.preventDefault(); document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }) }}>
              Contact Me
            </a>
          </div>

          <div className="hero-social">
            <a href="https://github.com/SyntaxSeraph" target="_blank" rel="noreferrer" className="social-link" title="GitHub">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/sohan-hazra2024/" target="_blank" rel="noreferrer" className="social-link" title="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="mailto:sohanhazra70@gmail.com" className="social-link" title="Email">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>
            </a>
          </div>
        </div>

        {/* 3D Profile Side */}
        <div className="hero-visual">
          <div className="profile-scene">
            <div className="profile-ring ring-outer" />
            <div className="profile-ring ring-mid" />
            <div className="profile-orbit">
              <div className="orbit-dot dot-1" style={{ '--r': '90px', animationDuration: '6s' }} />
              <div className="orbit-dot dot-2" style={{ '--r': '90px', animationDuration: '8s', animationDelay: '-3s' }} />
              <div className="orbit-dot dot-3" style={{ '--r': '90px', animationDuration: '10s', animationDelay: '-6s' }} />
            </div>
            <div className="profile-card">
              <div className="profile-avatar">
                <img src={sohanImg} alt="Sohan Hazra" className="avatar-photo" />
                <div className="avatar-glow" />
              </div>
            </div>
            <div className="floating-chip chip-1">
              <span className="chip-icon">⚡</span> React
            </div>
            <div className="floating-chip chip-2">
              <span className="chip-icon">🐍</span> Python
            </div>
            <div className="floating-chip chip-3">
              <span className="chip-icon">☕</span> Java
            </div>
            <div className="floating-chip chip-4">
              <span className="chip-icon">🗄️</span> Full Stack
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span>Scroll</span>
      </div>
    </section>
  )
}
