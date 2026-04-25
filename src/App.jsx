import { useEffect, useRef, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Services from './components/Services'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Background3D from './components/Background3D'
import ScrollTop from './components/ScrollTop'
import Cursor from './components/Cursor'
import ScrollEffects from './components/ScrollEffects'

function App() {
  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left')
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
        else e.target.classList.remove('visible')
      }),
      { threshold: 0.12 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <Cursor />
      <ScrollEffects />
      <Background3D />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ScrollTop />
    </>
  )
}

export default App
