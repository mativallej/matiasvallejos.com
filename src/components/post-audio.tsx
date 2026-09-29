"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { PostAudio as PostAudioData } from "@/lib/blog"

type Props = {
  audio: PostAudioData
  locale: string
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "--:--"
  const total = Math.floor(seconds)
  const mins = Math.floor(total / 60)
  const secs = total % 60
  return `${mins}:${String(secs).padStart(2, "0")}`
}

/**
 * Inline player for a post's audio version. Native <audio controls> can't be
 * themed, so this drives a hidden element and renders its own transport.
 * preload="metadata" keeps the (large) file off the wire until someone plays it.
 */
export function PostAudio({ audio, locale }: Props) {
  const isEs = locale === "es"
  const ref = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [total, setTotal] = useState(0)

  const toggle = useCallback(() => {
    const el = ref.current
    if (!el) return
    if (el.paused) void el.play()
    else el.pause()
  }, [])

  // Duration can arrive before this effect subscribes (cached metadata), so read
  // it once on mount as well as on loadedmetadata.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onTime = () => setCurrent(el.currentTime)
    const onMeta = () => setTotal(el.duration)
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onEnded = () => setPlaying(false)

    if (Number.isFinite(el.duration)) setTotal(el.duration)
    el.addEventListener("timeupdate", onTime)
    el.addEventListener("loadedmetadata", onMeta)
    el.addEventListener("durationchange", onMeta)
    el.addEventListener("play", onPlay)
    el.addEventListener("pause", onPause)
    el.addEventListener("ended", onEnded)
    return () => {
      el.removeEventListener("timeupdate", onTime)
      el.removeEventListener("loadedmetadata", onMeta)
      el.removeEventListener("durationchange", onMeta)
      el.removeEventListener("play", onPlay)
      el.removeEventListener("pause", onPause)
      el.removeEventListener("ended", onEnded)
    }
  }, [])

  const seek = (value: number) => {
    const el = ref.current
    if (!el || !Number.isFinite(el.duration)) return
    el.currentTime = value
    setCurrent(value)
  }

  // Fall back to the duration declared in frontmatter until metadata loads.
  const readout = total > 0 ? formatTime(total) : audio.duration ?? "--:--"

  return (
    <section
      className="max-w-[720px] mb-12 rounded-xl border border-[#3D3935] bg-[#0C0A09] p-4 sm:p-5"
      aria-label={isEs ? "Versión en audio" : "Audio version"}
    >
      <div className="flex items-center gap-2 mb-4 font-mono text-caption uppercase tracking-[0.08em]">
        <span className="text-[#A3B86C]">{isEs ? "Escuchar" : "Listen"}</span>
        <span className="text-[#3D3935]">{"/"}</span>
        <span className="text-[#57534E]">{readout}</span>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={toggle}
          aria-label={
            playing
              ? isEs
                ? "Pausar audio"
                : "Pause audio"
              : isEs
                ? "Reproducir audio"
                : "Play audio"
          }
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#FB923C]/15 text-[#FB923C] hover:bg-[#FB923C]/25 transition-colors duration-200"
        >
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l11.14-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14z" />
            </svg>
          )}
        </button>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          {audio.title && (
            <p className="truncate text-body-sm font-semibold text-white">{audio.title}</p>
          )}
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={total > 0 ? total : 100}
              step={1}
              value={current}
              disabled={total === 0}
              onChange={(e) => seek(Number(e.target.value))}
              aria-label={isEs ? "Progreso del audio" : "Audio progress"}
              className="h-1 w-full cursor-pointer appearance-none rounded-full bg-[#3D3935] accent-[#FB923C] disabled:cursor-default"
            />
            <span className="flex-shrink-0 font-mono text-caption text-[#57534E] tabular-nums">
              {formatTime(current)}
            </span>
          </div>
        </div>
      </div>

      {(audio.note || audio.sourceUrl) && (
        <p className="mt-4 text-body-sm text-[#78716C] leading-relaxed">
          {audio.note}
          {audio.sourceUrl && (
            <>
              {audio.note ? " " : null}
              <a
                href={audio.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A8A29E] underline decoration-[#3D3935] underline-offset-4 hover:text-[#FB923C] hover:decoration-[#FB923C] transition-colors duration-200"
              >
                {audio.sourceLabel ?? (isEs ? "Ver la fuente" : "View source")}
              </a>
            </>
          )}
        </p>
      )}

      <audio ref={ref} src={audio.src} preload="metadata" className="hidden">
        <track kind="captions" />
      </audio>
    </section>
  )
}
