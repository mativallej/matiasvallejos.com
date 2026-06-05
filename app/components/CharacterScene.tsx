'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import './CharacterScene.css'

type CharState =
  | 'idle'
  | 'walkDR'
  | 'walkDL'
  | 'walkUR'
  | 'walkUL'
  | 'sleep'
  | 'wave'
  | 'hit'

interface Character {
  id: number
  x: number
  y: number
  dx: number
  dy: number
  state: CharState
  prevState: CharState
  facingFlip: boolean
  scale: number
  stateChangedAt: number
  nextDecisionAt: number
  stationarySince: number
  alive: boolean
  opacity: number
  spawning: boolean
  despawning: boolean
  dragging: boolean
  waveCooldownUntil: number
  mouseFarSinceWave: boolean
}

const SPRITE_PATHS = [
  '/ch/ch-idle.webp',
  '/ch/ch-walk-diagonal-abajo-derecha.webp',
  '/ch/ch-walk-diagonal-abajo-izquierda.webp',
  '/ch/ch-walk-diagonal-arriba-derecha.webp',
  '/ch/ch-walk-diagonal-arriba-izquierda.webp',
  '/ch/ch-hit.webp',
  '/ch/ch-sleep.webp',
  '/ch/ch-wave.webp',
]

const CHAR_W = 64
const CHAR_H = 128
const TARGET_MIN = 4
const TARGET_MAX = 6

const ONESHOT_DURATIONS: Partial<Record<CharState, number>> = {
  wave: 1800,
  hit: 450,
}

const SPAWN_FADE_MS = 400

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function pickWeighted<T>(items: { item: T; weight: number }[]): T {
  const total = items.reduce((s, i) => s + i.weight, 0)
  let r = Math.random() * total
  for (const { item, weight } of items) {
    r -= weight
    if (r <= 0) return item
  }
  return items[items.length - 1].item
}

function dirFor(state: CharState): { dx: number; dy: number } {
  switch (state) {
    case 'walkDR':
      return { dx: 1.2, dy: 0.6 }
    case 'walkDL':
      return { dx: -1.2, dy: 0.6 }
    case 'walkUR':
      return { dx: 1.2, dy: -0.6 }
    case 'walkUL':
      return { dx: -1.2, dy: -0.6 }
    default:
      return { dx: 0, dy: 0 }
  }
}

function randomWalkState(): CharState {
  const walks: CharState[] = ['walkDR', 'walkDL', 'walkUR', 'walkUL']
  return walks[Math.floor(Math.random() * walks.length)]
}

function flipFor(state: CharState, fallback: boolean): boolean {
  // walkUL sprite is mis-oriented vs walkUR — flip it horizontally to match direction
  if (state === 'walkUL') return true
  if (state === 'walkDL' || state === 'walkDR' || state === 'walkUR') return false
  return fallback
}

let NEXT_ID = 1

export default function CharacterScene() {
  const charsRef = useRef<Character[]>([])
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mouseRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 })
  const lastClientRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 })
  const dimsRef = useRef<{ w: number; h: number }>({ w: 1920, h: 1080 })
  const lastRenderRef = useRef(0)
  const dragRef = useRef<{
    id: number
    pointerId: number
    offsetX: number
    offsetY: number
    startX: number
    startY: number
    started: boolean
  } | null>(null)
  const [enabled, setEnabled] = useState(false)
  const [, setTick] = useState(0)

  const rerender = useCallback(() => setTick((t) => (t + 1) % 1_000_000), [])

  // Respect reduced motion preference; otherwise enabled everywhere (mobile included)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mqReduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const compute = () => !mqReduced.matches
    setEnabled(compute())
    const onChange = () => setEnabled(compute())
    mqReduced.addEventListener('change', onChange)
    return () => {
      mqReduced.removeEventListener('change', onChange)
    }
  }, [])

  // Preload images (only when active)
  useEffect(() => {
    if (!enabled) return
    SPRITE_PATHS.forEach((p) => {
      const img = new window.Image()
      img.src = p
    })
  }, [enabled])

  const computeScale = useCallback((_y: number) => {
    return 1.35
  }, [])

  const spawnCharacter = useCallback(
    (atEdge = false): Character => {
      const w = dimsRef.current.w
      const h = dimsRef.current.h
      let x: number
      let y: number
      if (atEdge) {
        const side = Math.floor(Math.random() * 4)
        if (side === 0) {
          x = 0
          y = rand(h * 0.2, h - CHAR_H)
        } else if (side === 1) {
          x = w - CHAR_W
          y = rand(h * 0.2, h - CHAR_H)
        } else if (side === 2) {
          x = rand(0, w - CHAR_W)
          y = h * 0.2
        } else {
          x = rand(0, w - CHAR_W)
          y = h - CHAR_H
        }
      } else {
        x = rand(0, w - CHAR_W)
        y = rand(h * 0.2, h - CHAR_H)
      }
      const now = performance.now()
      const c: Character = {
        id: NEXT_ID++,
        x,
        y,
        dx: 0,
        dy: 0,
        state: 'idle',
        prevState: 'idle',
        facingFlip: false,
        scale: computeScale(y),
        stateChangedAt: now,
        nextDecisionAt: now + 400,
        stationarySince: now,
        alive: true,
        opacity: 0,
        spawning: true,
        despawning: false,
        dragging: false,
        waveCooldownUntil: 0,
        mouseFarSinceWave: true,
      }
      // fade in, then enable AI
      setTimeout(() => {
        c.opacity = 1
        rerender()
      }, 20)
      setTimeout(() => {
        if (!c.alive) return
        c.spawning = false
        c.stateChangedAt = performance.now()
        c.nextDecisionAt = performance.now() + rand(2000, 5000)
        rerender()
      }, SPAWN_FADE_MS)
      return c
    },
    [computeScale, rerender]
  )

  const despawnCharacter = useCallback(
    (c: Character) => {
      if (c.despawning || !c.alive) return
      c.despawning = true
      c.dx = 0
      c.dy = 0
      c.stateChangedAt = performance.now()
      c.opacity = 0
      rerender()
      setTimeout(() => {
        c.alive = false
        charsRef.current = charsRef.current.filter((x) => x.id !== c.id)
        // spawn replacement if needed
        if (charsRef.current.length < TARGET_MIN) {
          charsRef.current.push(spawnCharacter(true))
        }
        rerender()
      }, 700)
    },
    [rerender, spawnCharacter]
  )

  // Initial spawn
  useEffect(() => {
    if (!enabled) return
    if (typeof window === 'undefined') return
    const measure = () => ({
      w: window.innerWidth,
      h: Math.max(
        document.documentElement.scrollHeight,
        document.body?.scrollHeight ?? 0,
        window.innerHeight
      ),
    })
    dimsRef.current = measure()
    const initial = 6
    for (let i = 0; i < initial; i++) {
      setTimeout(() => {
        charsRef.current.push(spawnCharacter(false))
        rerender()
      }, i * 200)
    }

    const onResize = () => {
      dimsRef.current = measure()
      // Clamp existing characters into new bounds
      const w = dimsRef.current.w
      const h = dimsRef.current.h
      for (const c of charsRef.current) {
        if (c.x > w - CHAR_W) c.x = Math.max(0, w - CHAR_W)
        if (c.y > h - CHAR_H) c.y = Math.max(h * 0.15, h - CHAR_H)
      }
    }
    const onMouse = (e: MouseEvent) => {
      lastClientRef.current = { x: e.clientX, y: e.clientY }
      mouseRef.current = { x: e.pageX, y: e.pageY }
    }
    const onScroll = () => {
      // Re-derive page coords from last known client coords so wave-on-proximity stays accurate while scrolling without mouse movement
      const c = lastClientRef.current
      if (c.x > -9000) {
        mouseRef.current = { x: c.x + window.scrollX, y: c.y + window.scrollY }
      }
    }
    const ro = new ResizeObserver(onResize)
    ro.observe(document.documentElement)
    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouse)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('scroll', onScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled])

  // Periodic despawn/respawn
  useEffect(() => {
    if (!enabled) return
    let alive = true
    const schedule = () => {
      if (!alive) return
      const delay = rand(10000, 20000)
      setTimeout(() => {
        if (!alive) return
        const list = charsRef.current.filter(
          (c) => c.alive && !c.despawning && !c.spawning
        )
        if (list.length > TARGET_MIN) {
          const pick = list[Math.floor(Math.random() * list.length)]
          despawnCharacter(pick)
        } else if (list.length < TARGET_MAX) {
          charsRef.current.push(spawnCharacter(true))
          rerender()
        } else {
          const pick = list[Math.floor(Math.random() * list.length)]
          despawnCharacter(pick)
        }
        schedule()
      }, delay)
    }
    schedule()
    return () => {
      alive = false
    }
  }, [despawnCharacter, spawnCharacter, rerender, enabled])

  // Main rAF loop
  useEffect(() => {
    if (!enabled) return
    let raf = 0
    let lastTs = performance.now()
    let paused = typeof document !== 'undefined' && document.hidden
    const onVis = () => {
      paused = document.hidden
      if (!paused) {
        lastTs = performance.now()
        raf = requestAnimationFrame(tick)
      } else {
        cancelAnimationFrame(raf)
      }
    }
    document.addEventListener('visibilitychange', onVis)

    const decideNextState = (c: Character, now: number) => {
      if (c.spawning || c.despawning) return
      // one-shot guard handled separately
      const dur = ONESHOT_DURATIONS[c.state]
      if (dur && now - c.stateChangedAt < dur) return

      // return from one-shot
      if (dur) {
        const next = c.prevState
        c.state = next
        const d = dirFor(next)
        c.dx = d.dx
        c.dy = d.dy
        c.stateChangedAt = now
        c.nextDecisionAt = now + rand(2000, 5000)
        return
      }

      if (now < c.nextDecisionAt) return

      // sleep wake
      if (c.state === 'sleep') {
        const sleepDur = now - c.stateChangedAt
        if (sleepDur > rand(4000, 8000)) {
          c.state = 'idle'
          c.dx = 0
          c.dy = 0
          c.stateChangedAt = now
          c.nextDecisionAt = now + rand(2000, 5000)
          c.stationarySince = now
        }
        return
      }

      // Sleep trigger if idle stationary >15s
      if (
        c.state === 'idle' &&
        now - c.stationarySince > 15000
      ) {
        c.state = 'sleep'
        c.dx = 0
        c.dy = 0
        c.stateChangedAt = now
        c.nextDecisionAt = now + 4000
        return
      }

      let next: CharState
      if (c.state === 'idle') {
        next = pickWeighted<CharState>([
          { item: randomWalkState(), weight: 60 },
          { item: 'sleep', weight: 20 },
          { item: 'idle', weight: 20 },
        ])
      } else {
        // from walk
        next = pickWeighted<CharState>([
          { item: 'idle', weight: 1 },
          { item: randomWalkState(), weight: 3 },
        ])
      }
      c.state = next
      const d = dirFor(next)
      c.dx = d.dx
      c.dy = d.dy
      c.stateChangedAt = now
      c.nextDecisionAt = now + rand(2000, 5000)
      if (next === 'idle' || next === 'sleep') {
        c.stationarySince = now
      }
    }

    const tick = (ts: number) => {
      raf = requestAnimationFrame(tick)
      const dtMs = ts - lastTs
      lastTs = ts
      const dt = Math.min(2, dtMs / 16.6667) // normalize to ~60fps step

      const w = dimsRef.current.w
      const h = dimsRef.current.h
      const mouse = mouseRef.current
      let stateChanged = false

      for (const c of charsRef.current) {
        if (!c.alive) continue
        if (c.dragging) continue

        // proximity wave check (not during despawn / spawn / one-shots)
        const dur = ONESHOT_DURATIONS[c.state]
        if (!c.despawning && !c.spawning && !dur && c.state !== 'wave') {
          const cx = c.x + CHAR_W / 2
          const cy = c.y + CHAR_H / 2
          const ddx = mouse.x - cx
          const ddy = mouse.y - cy
          const dist = Math.sqrt(ddx * ddx + ddy * ddy)
          // require mouse to have moved away (>200px) before allowing wave to re-fire
          if (dist > 200) c.mouseFarSinceWave = true
          if (dist < 120 && ts >= c.waveCooldownUntil && c.mouseFarSinceWave) {
            c.prevState = c.state === 'sleep' ? 'idle' : c.state
            c.state = 'wave'
            c.dx = 0
            c.dy = 0
            c.stateChangedAt = ts
            c.stationarySince = ts
            c.mouseFarSinceWave = false
            c.waveCooldownUntil = ts + 4000
            stateChanged = true
          }
        }

        // decision logic
        const prevS = c.state
        decideNextState(c, ts)
        if (c.state !== prevS) stateChanged = true

        // movement
        if (c.dx !== 0 || c.dy !== 0) {
          c.x += c.dx * dt
          c.y += c.dy * dt

          // edge handling
          let hit = false
          if (c.x < 0) {
            c.x = 0
            hit = true
          } else if (c.x > w - CHAR_W) {
            c.x = w - CHAR_W
            hit = true
          }
          if (c.y < h * 0.15) {
            c.y = h * 0.15
            hit = true
          } else if (c.y > h - CHAR_H) {
            c.y = h - CHAR_H
            hit = true
          }
          if (hit) {
            const isWalk =
              c.state === 'walkDR' ||
              c.state === 'walkDL' ||
              c.state === 'walkUR' ||
              c.state === 'walkUL'
            if (isWalk) {
              const next = randomWalkState()
              c.state = next
              const d = dirFor(next)
              c.dx = d.dx
              c.dy = d.dy
              c.stateChangedAt = ts
              c.nextDecisionAt = ts + rand(2000, 5000)
              stateChanged = true
            } else {
              c.dx = 0
              c.dy = 0
            }
          }

          c.stationarySince = ts
        }

        c.scale = computeScale(c.y)
      }

      // Throttle re-renders to ~30fps for position updates
      if (ts - lastRenderRef.current > 33 || stateChanged) {
        lastRenderRef.current = ts
        rerender()
      }
    }

    if (!paused) raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [computeScale, rerender, enabled])

  const DRAG_THRESHOLD = 6

  const handlePointerEnter = (c: Character, _e: React.PointerEvent) => {
    if (c.despawning || c.spawning || c.dragging) return
    if (c.state === 'wave') return
    const dur = ONESHOT_DURATIONS[c.state]
    if (dur) return
    const now = performance.now()
    if (now < c.waveCooldownUntil) return
    c.prevState = c.state === 'sleep' ? 'idle' : c.state
    c.state = 'wave'
    c.dx = 0
    c.dy = 0
    c.stateChangedAt = now
    c.stationarySince = now
    c.mouseFarSinceWave = false
    c.waveCooldownUntil = now + 4000
    rerender()
  }

  const handlePointerDown = (c: Character, e: React.PointerEvent) => {
    if (c.despawning || c.spawning) return
    e.stopPropagation()
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    dragRef.current = {
      id: c.id,
      pointerId: e.pointerId,
      offsetX: e.pageX - c.x,
      offsetY: e.pageY - c.y,
      startX: e.pageX,
      startY: e.pageY,
      started: false,
    }
  }

  const handlePointerMove = (c: Character, e: React.PointerEvent) => {
    const d = dragRef.current
    if (!d || d.id !== c.id || d.pointerId !== e.pointerId) return
    const dx = e.pageX - d.startX
    const dy = e.pageY - d.startY
    if (!d.started && dx * dx + dy * dy < DRAG_THRESHOLD * DRAG_THRESHOLD) return
    if (!d.started) {
      d.started = true
      c.dragging = true
      c.prevState = c.state === 'sleep' ? 'idle' : c.state
      c.state = 'idle'
      c.dx = 0
      c.dy = 0
      c.stateChangedAt = performance.now()
    }
    const w = dimsRef.current.w
    const h = dimsRef.current.h
    c.x = Math.max(0, Math.min(w - CHAR_W, e.pageX - d.offsetX))
    c.y = Math.max(h * 0.15, Math.min(h - CHAR_H, e.pageY - d.offsetY))
    rerender()
  }

  const handlePointerUp = (c: Character, e: React.PointerEvent) => {
    const d = dragRef.current
    if (!d || d.id !== c.id || d.pointerId !== e.pointerId) return
    e.stopPropagation()
    try {
      ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
    } catch {}
    const now = performance.now()
    if (d.started) {
      // End drag: return cleanly to idle, no one-shot animation
      c.dragging = false
      c.state = 'idle'
      c.dx = 0
      c.dy = 0
      c.stateChangedAt = now
      c.stationarySince = now
      c.nextDecisionAt = now + rand(2000, 5000)
    } else {
      // Treat as click: hit reaction
      if (c.despawning || c.spawning) {
        dragRef.current = null
        return
      }
      const dur = ONESHOT_DURATIONS[c.state]
      if (!dur) {
        c.prevState = c.state === 'sleep' ? 'idle' : c.state
        c.state = 'hit'
        c.dx = 0
        c.dy = 0
        c.stateChangedAt = now
      }
    }
    dragRef.current = null
    rerender()
  }

  if (!enabled) return null

  return (
    <div
      ref={containerRef}
      className="cs-root"
      aria-hidden="true"
      style={{ width: dimsRef.current.w, height: dimsRef.current.h }}
    >
      {charsRef.current.map((c) => {
        const z = Math.floor(c.y)
        const isUR = c.state === 'walkUR'
        const h = isUR ? 132 : 128
        const flipClass = flipFor(c.state, c.facingFlip) ? 'cs-flip' : ''
        const dragScale = c.dragging ? 1.15 : 1
        return (
          <div
            key={c.id}
            className={`cs-char${c.dragging ? ' cs-dragging' : ''}`}
            style={{
              left: c.x,
              top: c.y,
              width: CHAR_W,
              height: h,
              transform: `scale(${c.scale * dragScale})`,
              zIndex: c.dragging ? 9999 : z,
              opacity: c.opacity,
              cursor: c.dragging ? 'grabbing' : 'grab',
              touchAction: 'none',
            }}
            onPointerEnter={(e) => handlePointerEnter(c, e)}
            onPointerDown={(e) => handlePointerDown(c, e)}
            onPointerMove={(e) => handlePointerMove(c, e)}
            onPointerUp={(e) => handlePointerUp(c, e)}
            onPointerCancel={(e) => handlePointerUp(c, e)}
          >
            <div className={`cs-sprite cs-${c.state} ${flipClass}`} />
          </div>
        )
      })}
    </div>
  )
}
