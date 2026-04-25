import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Background3D() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    const W = window.innerWidth, H = window.innerHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(65, W / H, 0.1, 1000)
    camera.position.z = 35

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // ── 1. MAIN PARTICLES (teal) ──────────────────────────────────────────
    const COUNT = 500
    const positions = new Float32Array(COUNT * 3)
    const speeds = []
    const sizes = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 140
      positions[i * 3 + 1] = (Math.random() - 0.5) * 140
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80
      speeds.push({ x: (Math.random() - 0.5) * 0.025, y: (Math.random() - 0.5) * 0.025 })
      sizes[i] = Math.random() * 0.5 + 0.15
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    pGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    const pMat = new THREE.PointsMaterial({ color: 0x00f5d4, size: 0.45, transparent: true, opacity: 0.75, sizeAttenuation: true })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    // ── 2. SECONDARY PARTICLES (purple) ──────────────────────────────────
    const COUNT2 = 200
    const pos2 = new Float32Array(COUNT2 * 3)
    const spd2 = []
    for (let i = 0; i < COUNT2; i++) {
      pos2[i * 3] = (Math.random() - 0.5) * 160
      pos2[i * 3 + 1] = (Math.random() - 0.5) * 160
      pos2[i * 3 + 2] = (Math.random() - 0.5) * 80
      spd2.push({ x: (Math.random() - 0.5) * 0.018, y: (Math.random() - 0.5) * 0.018 })
    }
    const p2Geo = new THREE.BufferGeometry()
    p2Geo.setAttribute('position', new THREE.BufferAttribute(pos2, 3))
    const p2Mat = new THREE.PointsMaterial({ color: 0x9b6dff, size: 0.35, transparent: true, opacity: 0.65, sizeAttenuation: true })
    const particles2 = new THREE.Points(p2Geo, p2Mat)
    scene.add(particles2)

    // ── 3. ORANGE ACCENT PARTICLES ────────────────────────────────────────
    const COUNT3 = 80
    const pos3 = new Float32Array(COUNT3 * 3)
    for (let i = 0; i < COUNT3; i++) {
      pos3[i * 3] = (Math.random() - 0.5) * 120
      pos3[i * 3 + 1] = (Math.random() - 0.5) * 120
      pos3[i * 3 + 2] = (Math.random() - 0.5) * 60
    }
    const p3Geo = new THREE.BufferGeometry()
    p3Geo.setAttribute('position', new THREE.BufferAttribute(pos3, 3))
    const p3Mat = new THREE.PointsMaterial({ color: 0xf97316, size: 0.3, transparent: true, opacity: 0.55, sizeAttenuation: true })
    const particles3 = new THREE.Points(p3Geo, p3Mat)
    scene.add(particles3)

    // ── 4. ANIMATED GRID (perspective floor) ─────────────────────────────
    const gridHelper = new THREE.GridHelper(300, 60, 0x00f5d4, 0x0d2040)
    gridHelper.material.opacity = 0.14
    gridHelper.material.transparent = true
    gridHelper.position.y = -22
    scene.add(gridHelper)

    // Second elevated grid
    const gridHelper2 = new THREE.GridHelper(300, 60, 0x6d28d9, 0x0d2040)
    gridHelper2.material.opacity = 0.07
    gridHelper2.material.transparent = true
    gridHelper2.position.y = 22
    scene.add(gridHelper2)

    // ── 5. BIG TORUS KNOT (top-right) ─────────────────────────────────────
    const tkGeo = new THREE.TorusKnotGeometry(6, 1.6, 160, 20)
    const tkMat = new THREE.MeshStandardMaterial({
      color: 0x7c3aed, emissive: 0x3d1a7a, wireframe: true,
      transparent: true, opacity: 0.35,
    })
    const torusKnot = new THREE.Mesh(tkGeo, tkMat)
    torusKnot.position.set(22, 10, -12)
    scene.add(torusKnot)

    // ── 6. ICOSAHEDRON (bottom-left, big) ────────────────────────────────
    const icoGeo = new THREE.IcosahedronGeometry(5, 1)
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x00f5d4, emissive: 0x005a52, wireframe: true,
      transparent: true, opacity: 0.28,
    })
    const ico = new THREE.Mesh(icoGeo, icoMat)
    ico.position.set(-26, -8, -6)
    scene.add(ico)

    // ── 7. OCTAHEDRON (center-ish) ────────────────────────────────────────
    const octGeo = new THREE.OctahedronGeometry(3.5, 1)
    const octMat = new THREE.MeshStandardMaterial({
      color: 0xf97316, emissive: 0x7a3800, wireframe: true,
      transparent: true, opacity: 0.25,
    })
    const oct = new THREE.Mesh(octGeo, octMat)
    oct.position.set(-18, 14, -14)
    scene.add(oct)

    // ── 8. TORUS RING (bottom-right) ──────────────────────────────────────
    const torGeo = new THREE.TorusGeometry(5, 0.4, 24, 80)
    const torMat = new THREE.MeshStandardMaterial({
      color: 0x00f5d4, emissive: 0x003d35, wireframe: false,
      transparent: true, opacity: 0.22,
    })
    const tor = new THREE.Mesh(torGeo, torMat)
    tor.position.set(26, -12, -8)
    tor.rotation.x = Math.PI / 3
    scene.add(tor)

    // ── 9. PULSING CONCENTRIC RINGS ───────────────────────────────────────
    const rings = []
    for (let r = 0; r < 4; r++) {
      const rGeo = new THREE.TorusGeometry(8 + r * 5, 0.06, 8, 100)
      const rMat = new THREE.MeshBasicMaterial({
        color: r % 2 === 0 ? 0x00f5d4 : 0x7c3aed,
        transparent: true, opacity: 0.15 - r * 0.02,
      })
      const ring = new THREE.Mesh(rGeo, rMat)
      ring.rotation.x = Math.PI / 2
      ring.position.set(0, 0, -20)
      scene.add(ring)
      rings.push(ring)
    }

    // ── 10. METEOR STREAKS ────────────────────────────────────────────────
    const meteors = []
    const createMeteor = () => {
      const len = Math.random() * 8 + 4
      const mGeo = new THREE.CylinderGeometry(0.03, 0.0, len, 4)
      const mMat = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.5 ? 0x00f5d4 : 0xffffff,
        transparent: true,
        opacity: 0.7,
      })
      const m = new THREE.Mesh(mGeo, mMat)
      m.position.set(
        (Math.random() - 0.5) * 100,
        Math.random() * 60 + 20,
        (Math.random() - 0.5) * 40
      )
      m.rotation.z = -Math.PI / 5
      m.userData = {
        vx: -(Math.random() * 0.8 + 0.4),
        vy: -(Math.random() * 0.5 + 0.25),
        life: 0,
        maxLife: Math.random() * 120 + 60,
      }
      scene.add(m)
      meteors.push(m)
    }
    for (let i = 0; i < 6; i++) createMeteor()

    // ── 11. FLOATING CODE CUBES ───────────────────────────────────────────
    const cubes = []
    for (let c = 0; c < 8; c++) {
      const sz = Math.random() * 1.2 + 0.4
      const cGeo = new THREE.BoxGeometry(sz, sz, sz)
      const cMat = new THREE.MeshStandardMaterial({
        color: [0x00f5d4, 0x7c3aed, 0xf97316][c % 3],
        emissive: [0x003d35, 0x2d1060, 0x7a3800][c % 3],
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      })
      const cube = new THREE.Mesh(cGeo, cMat)
      cube.position.set(
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 30
      )
      cube.userData = {
        rx: (Math.random() - 0.5) * 0.015,
        ry: (Math.random() - 0.5) * 0.015,
        floatOffset: Math.random() * Math.PI * 2,
      }
      scene.add(cube)
      cubes.push(cube)
    }

    // ── 12. CONNECTING LINES ──────────────────────────────────────────────
    const linePoints = []
    for (let l = 0; l < 20; l++) {
      const sx = (Math.random() - 0.5) * 120
      const sy = (Math.random() - 0.5) * 80
      const ex = sx + (Math.random() - 0.5) * 30
      const ey = sy + (Math.random() - 0.5) * 30
      linePoints.push([new THREE.Vector3(sx, sy, -15), new THREE.Vector3(ex, ey, -15)])
    }
    const lineGroup = new THREE.Group()
    linePoints.forEach(([a, b]) => {
      const lGeo = new THREE.BufferGeometry().setFromPoints([a, b])
      const lMat = new THREE.LineBasicMaterial({
        color: 0x00f5d4, transparent: true, opacity: 0.08,
      })
      lineGroup.add(new THREE.Line(lGeo, lMat))
    })
    scene.add(lineGroup)

    // ── LIGHTS ────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x00f5d4, 0.5))
    const dLight = new THREE.DirectionalLight(0x7c3aed, 1.2)
    dLight.position.set(10, 20, 10)
    scene.add(dLight)
    const pLight = new THREE.PointLight(0x00f5d4, 2, 80)
    pLight.position.set(-20, 10, 5)
    scene.add(pLight)
    const pLight2 = new THREE.PointLight(0x9b6dff, 1.5, 80)
    pLight2.position.set(20, -10, 5)
    scene.add(pLight2)

    // ── MOUSE PARALLAX ────────────────────────────────────────────────────
    let mouseX = 0, mouseY = 0
    const onMouse = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 1.2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.9
    }
    window.addEventListener('mousemove', onMouse)

    // ── SCROLL TRACKING ──────────────────────────────────────────────────
    let scrollOffset = 0
    let smoothScrollY = 0
    const scrollFactor = 0.012  // how much scene moves per pixel scrolled
    const onScroll = () => {
      scrollOffset = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const onResize = () => {
      const w = window.innerWidth, h = window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    // ── ANIMATION LOOP ────────────────────────────────────────────────────
    let frame, t = 0
    const lookTarget = new THREE.Vector3()
    const animate = () => {
      frame = requestAnimationFrame(animate)
      t += 0.005

      // smooth scroll interpolation
      const targetY = -scrollOffset * scrollFactor
      smoothScrollY += (targetY - smoothScrollY) * 0.08

      // --- particles drift ---
      const pa = particles.geometry.attributes.position.array
      for (let i = 0; i < COUNT; i++) {
        pa[i * 3] += speeds[i].x
        pa[i * 3 + 1] += speeds[i].y
        if (pa[i * 3] > 70) pa[i * 3] = -70
        if (pa[i * 3] < -70) pa[i * 3] = 70
        if (pa[i * 3 + 1] > 70) pa[i * 3 + 1] = -70
        if (pa[i * 3 + 1] < -70) pa[i * 3 + 1] = 70
      }
      particles.geometry.attributes.position.needsUpdate = true

      const pa2 = particles2.geometry.attributes.position.array
      for (let i = 0; i < COUNT2; i++) {
        pa2[i * 3] += spd2[i].x
        pa2[i * 3 + 1] += spd2[i].y
        if (pa2[i * 3] > 80) pa2[i * 3] = -80
        if (pa2[i * 3] < -80) pa2[i * 3] = 80
        if (pa2[i * 3 + 1] > 80) pa2[i * 3 + 1] = -80
        if (pa2[i * 3 + 1] < -80) pa2[i * 3 + 1] = 80
      }
      particles2.geometry.attributes.position.needsUpdate = true

      // pulse particles opacity
      pMat.opacity = 0.65 + Math.sin(t * 1.5) * 0.15
      p2Mat.opacity = 0.5 + Math.sin(t * 2.2 + 1) * 0.15

      // --- geometry rotations ---
      torusKnot.rotation.x = t * 0.25
      torusKnot.rotation.y = t * 0.4
      ico.rotation.x = t * 0.35
      ico.rotation.y = t * 0.2
      oct.rotation.x = t * 0.3
      oct.rotation.z = t * 0.18
      tor.rotation.z = t * 0.22
      tor.rotation.y = t * 0.1

      // slow pulse opacity on shapes
      tkMat.opacity = 0.25 + Math.sin(t * 1.2) * 0.12
      icoMat.opacity = 0.2 + Math.sin(t * 0.9 + 1) * 0.1
      torMat.opacity = 0.15 + Math.sin(t * 1.6 + 2) * 0.08

      // grid drift
      gridHelper.position.z = ((t * 2) % 5)

      // --- pulsing rings ---
      rings.forEach((ring, i) => {
        const scale = 1 + Math.sin(t * 1.5 + i * 0.8) * 0.08
        ring.scale.set(scale, scale, scale)
        ring.material.opacity = (0.12 - i * 0.02) + Math.sin(t * 2 + i) * 0.06
        ring.rotation.z = t * 0.05 * (i % 2 === 0 ? 1 : -1)
      })

      // --- meteors ---
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i]
        m.userData.life++
        m.position.x += m.userData.vx
        m.position.y += m.userData.vy
        const progress = m.userData.life / m.userData.maxLife
        m.material.opacity = progress < 0.2
          ? progress / 0.2 * 0.8
          : (1 - progress) * 0.8
        if (m.userData.life >= m.userData.maxLife) {
          scene.remove(m)
          meteors.splice(i, 1)
          createMeteor()
        }
      }

      // --- cubes float ---
      cubes.forEach((cube) => {
        cube.rotation.x += cube.userData.rx
        cube.rotation.y += cube.userData.ry
        cube.position.y += Math.sin(t * 0.8 + cube.userData.floatOffset) * 0.015
      })

      // point light orbit
      pLight.position.x = Math.sin(t * 0.5) * 30
      pLight.position.z = Math.cos(t * 0.5) * 20
      pLight2.position.x = Math.cos(t * 0.4) * 30
      pLight2.position.z = Math.sin(t * 0.4) * 20

      // particles global slow spin
      particles.rotation.y = t * 0.03
      particles3.rotation.y = -t * 0.025

      // camera parallax + scroll offset
      camera.position.x += (mouseX * 8 - camera.position.x) * 0.035
      camera.position.y += ((-mouseY * 5 + smoothScrollY) - camera.position.y) * 0.06
      lookTarget.set(0, smoothScrollY, 0)
      camera.lookAt(lookTarget)

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
      renderer.dispose()
      if (mount && renderer.domElement) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  )
}
