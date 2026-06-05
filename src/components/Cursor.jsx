import { useEffect, useRef } from 'react'

const COLORS = ['#34d399', '#14b8a6', '#2dd4bf', '#5eead4', '#a7f3d0']

const TYPES = {
  default: { w: 28, h: 28, r: '50%', b: '1.5px solid rgba(52,211,153,0.5)', bg: 'transparent' },
  link:    { w: 16, h: 16, r: '50%', b: '2px solid #34d399', bg: 'rgba(52,211,153,0.2)' },
  button:  { w: 12, h: 12, r: '50%', b: 'none', bg: '#34d399' },
  code:    { w: 8,  h: 30, r: '3px', b: '2px solid #7ec699', bg: 'rgba(126,198,153,0.15)' },
  card:    { w: 44, h: 44, r: '10px', b: '1.5px solid rgba(52,211,153,0.3)', bg: 'rgba(52,211,153,0.05)' },
}

export default function CustomCursor() {
  const dotEl = useRef(null)
  const ringEl = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return

    const dot = dotEl.current
    const ring = ringEl.current
    if (!dot || !ring) return

    // Hide native cursor
    document.body.style.cursor = 'none'
    const styleId = 'cursor-hide-style'
    if (!document.getElementById(styleId)) {
      const s = document.createElement('style')
      s.id = styleId
      s.textContent = '* { cursor: none !important }'
      document.head.appendChild(s)
    }

    const pos = { x: -200, y: -200 }
    const ringPos = { x: -200, y: -200 }
    let type = 'default'
    let raf = null

    // Create particles pool
    const particles = []
    const MAX_PARTICLES = 30

    const getParticle = () => {
      if (particles.length < MAX_PARTICLES) {
        const el = document.createElement('div')
        el.style.cssText = 'position:fixed;pointer-events:none;z-index:200000;transform:translate(-50%,-50%);transition:all 0.4s ease-out;border-radius:50%'
        document.body.appendChild(el)
        particles.push(el)
        return el
      }
      return particles.shift()
    }

    const applyType = (t) => {
      if (t === type) return
      type = t
      const s = TYPES[t] || TYPES.default
      ring.style.width = s.w + 'px'
      ring.style.height = s.h + 'px'
      ring.style.borderRadius = s.r
      ring.style.border = s.b
      ring.style.background = s.bg
    }

    const detectType = (el) => {
      if (!el) return 'default'
      let target = el
      for (let i = 0; i < 5; i++) {
        if (!target) break
        if (target.dataset?.cursor) return target.dataset.cursor
        if (target.tagName === 'A' && target.href) return 'link'
        if (target.tagName === 'BUTTON') return 'button'
        if (target.tagName === 'CODE') return 'code'
        if (target.classList?.contains('btn')) return 'button'
        if (target.classList?.contains('project-card') || target.classList?.contains('sim-card')) return 'card'
        target = target.parentElement
      }
      return 'default'
    }

    const onMove = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
      dot.style.left = pos.x + 'px'
      dot.style.top = pos.y + 'px'
      // Type detection
      const el = document.elementFromPoint(e.clientX, e.clientY)
      applyType(detectType(el))
    }

    const onLeave = () => {
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }
    const onEnter = () => {
      dot.style.opacity = '1'
      ring.style.opacity = '1'
    }

    const onClick = (e) => {
      // Pulse ring
      const pw = ring.style.width
      const ph = ring.style.height
      ring.style.transition = 'all 0.08s ease-out'
      ring.style.width = '54px'
      ring.style.height = '54px'
      ring.style.opacity = '0.5'
      setTimeout(() => {
        ring.style.transition = 'all 0.2s ease-out'
        ring.style.width = pw
        ring.style.height = ph
        ring.style.opacity = '1'
      }, 80)

      // Particles
      for (let i = 0; i < 10; i++) {
        const p = getParticle()
        const angle = Math.random() * Math.PI * 2
        const dist = 20 + Math.random() * 35
        const size = 2 + Math.random() * 3
        p.style.width = size + 'px'
        p.style.height = size + 'px'
        p.style.background = COLORS[Math.floor(Math.random() * COLORS.length)]
        p.style.left = e.clientX + 'px'
        p.style.top = e.clientY + 'px'
        p.style.opacity = '1'
        p.style.transform = 'scale(1) translate(-50%,-50%)'
        requestAnimationFrame(() => {
          p.style.left = (e.clientX + Math.cos(angle) * dist) + 'px'
          p.style.top = (e.clientY + Math.sin(angle) * dist) + 'px'
          p.style.opacity = '0'
          p.style.transform = 'scale(0) translate(-50%,-50%)'
        })
      }
    }

    const tick = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.18
      ringPos.y += (pos.y - ringPos.y) * 0.18
      ring.style.left = Math.round(ringPos.x) + 'px'
      ring.style.top = Math.round(ringPos.y) + 'px'
      raf = requestAnimationFrame(tick)
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('click', onClick)
    tick()

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('click', onClick)
      if (raf) cancelAnimationFrame(raf)
      document.body.style.cursor = ''
      const s = document.getElementById(styleId)
      if (s) s.remove()
      particles.forEach(p => p.remove())
    }
  }, [])

  return (
    <>
      <div
        ref={dotEl}
        style={{
          position: 'fixed', left: '-200px', top: '-200px',
          width: '8px', height: '8px', borderRadius: '50%',
          background: '#34d399', pointerEvents: 'none',
          transform: 'translate(-50%,-50%)',
          zIndex: 200000,
          boxShadow: '0 0 8px rgba(52,211,153,0.6)',
          opacity: 0,
          transition: 'opacity 0.2s',
        }}
      />
      <div
        ref={ringEl}
        style={{
          position: 'fixed', left: '-200px', top: '-200px',
          width: '28px', height: '28px', borderRadius: '50%',
          border: '1.5px solid rgba(52,211,153,0.5)',
          background: 'transparent', pointerEvents: 'none',
          transform: 'translate(-50%,-50%)',
          zIndex: 199999,
          opacity: 0,
          transition: 'opacity 0.2s, width 0.15s, height 0.15s, border-radius 0.15s, border 0.15s, background 0.15s',
        }}
      />
    </>
  )
}
