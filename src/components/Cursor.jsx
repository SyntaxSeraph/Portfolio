import { useEffect, useRef } from 'react'
import './Cursor.css'

export default function Cursor() {
  const dotRef   = useRef(null)
  const ringRef  = useRef(null)
  const trailRef = useRef([])
  const posRef   = useRef({ x: -100, y: -100 })
  const ringPos  = useRef({ x: -100, y: -100 })
  const isHover  = useRef(false)
  const isClick  = useRef(false)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current

    // Create trail dots
    const TRAIL_COUNT = 8
    const trails = []
    for (let i = 0; i < TRAIL_COUNT; i++) {
      const el = document.createElement('div')
      el.className = 'cursor-trail'
      el.style.opacity = (1 - i / TRAIL_COUNT) * 0.4
      el.style.width  = `${6 - i * 0.5}px`
      el.style.height = `${6 - i * 0.5}px`
      document.body.appendChild(el)
      trails.push({ el, x: -100, y: -100 })
    }
    trailRef.current = trails

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
    }

    const onEnter = (e) => {
      const t = e.target
      if (
        t.tagName === 'A' ||
        t.tagName === 'BUTTON' ||
        t.closest('a') ||
        t.closest('button') ||
        t.classList.contains('skill-card') ||
        t.classList.contains('service-card') ||
        t.classList.contains('project-card')
      ) {
        isHover.current = true
        ring.classList.add('hovered')
        dot.classList.add('hovered')
      }
    }

    const onLeave = () => {
      isHover.current = false
      ring.classList.remove('hovered')
      dot.classList.remove('hovered')
    }

    const onDown = () => {
      isClick.current = true
      ring.classList.add('clicked')
      dot.classList.add('clicked')
    }

    const onUp = () => {
      isClick.current = false
      ring.classList.remove('clicked')
      dot.classList.remove('clicked')
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)

    // RAF loop — smooth ring lag + trail
    let frame
    const lerp = (a, b, t) => a + (b - a) * t

    const animate = () => {
      frame = requestAnimationFrame(animate)

      const { x, y } = posRef.current

      // Dot snaps immediately
      dot.style.left = `${x}px`
      dot.style.top  = `${y}px`

      // Ring lags
      ringPos.current.x = lerp(ringPos.current.x, x, 0.12)
      ringPos.current.y = lerp(ringPos.current.y, y, 0.12)
      ring.style.left = `${ringPos.current.x}px`
      ring.style.top  = `${ringPos.current.y}px`

      // Trail follows ring with stagger
      let prevX = ringPos.current.x
      let prevY = ringPos.current.y
      trails.forEach((t, i) => {
        const lag = 0.18 - i * 0.015
        t.x = lerp(t.x, prevX, lag)
        t.y = lerp(t.y, prevY, lag)
        t.el.style.left = `${t.x}px`
        t.el.style.top  = `${t.y}px`
        prevX = t.x
        prevY = t.y
      })
    }
    animate()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      trails.forEach(t => t.el.remove())
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
