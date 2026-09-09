import { useState, useEffect, useRef, useCallback } from 'react'

const LINES = [
  '> initializing environment...',
  '> loading infrastructure...',
  '> preparing deployment...',
  '> verifying application...',
  '> starting portfolio...',
  '> system ready.',
]

const STEP_MS = 580
// Bar sweeps 0 → 100% exactly as the last step lands (no JS involvement)
const BAR_MS = (LINES.length - 1) * STEP_MS // 2900 ms
const HOLD_MS = 400
const SEAM_AT = BAR_MS + HOLD_MS - 200 // 3100 ms (last 200 ms before exit)
const EXIT_START = BAR_MS + HOLD_MS // 3300 ms

/**
 * Full-screen status loader with cinematic split-shutter exit.
 *
 * - The loader sits cleanly above the shutter line with an opaque background.
 * - In the final 200 ms, the center differentiator seam line appears.
 * - On exit, the top half glides UP and bottom half glides DOWN to reveal the portfolio.
 */
export default function LoadingScreen({ onComplete }) {
  const [displayText, setDisplayText] = useState(LINES[0])
  const [textOpacity, setTextOpacity] = useState(1)
  const [showSeam, setShowSeam] = useState(false)
  const [exiting, setExiting] = useState(false)
  const completedRef = useRef(false)
  const reduced = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  const handleComplete = useCallback(() => {
    if (!completedRef.current) {
      completedRef.current = true
      onComplete?.()
    }
  }, [onComplete])

  useEffect(() => {
    // Lock body scroll while the loading & shutter sequence runs
    document.body.style.overflow = 'hidden'

    if (reduced.current) {
      setDisplayText(LINES[LINES.length - 1])
      const t = setTimeout(() => {
        setExiting(true)
        setTimeout(handleComplete, 300)
      }, 300)
      return () => {
        clearTimeout(t)
        document.body.style.overflow = ''
      }
    }

    // Schedule each text step: fade-out → swap content → fade-in
    const stepTimers = []
    LINES.slice(1).forEach((line, i) => {
      const fireAt = (i + 1) * STEP_MS
      stepTimers.push(
        setTimeout(() => setTextOpacity(0), fireAt - 120)
      )
      stepTimers.push(
        setTimeout(() => {
          setDisplayText(line)
          setTextOpacity(1)
        }, fireAt)
      )
    })

    // Reveal differentiator seam line in the last 200 ms before shutter opens
    const seamTimer = setTimeout(() => setShowSeam(true), SEAM_AT)

    // Trigger shutter exit after hold
    const exitTimer = setTimeout(() => setExiting(true), EXIT_START)
    // Safety fallback: ensure portfolio reveals even if animation events throttle
    const fallbackTimer = setTimeout(handleComplete, EXIT_START + 1200)

    return () => {
      stepTimers.forEach(clearTimeout)
      clearTimeout(seamTimer)
      clearTimeout(exitTimer)
      clearTimeout(fallbackTimer)
      document.body.style.overflow = ''
    }
  }, [handleComplete])

  function handleTopTransitionEnd(e) {
    // Only complete when the shutter transform animation completes (not border-color)
    if (exiting && e.target === e.currentTarget && e.propertyName === 'transform') {
      handleComplete()
    }
  }

  return (
    <div
      className={`ls-wrapper${showSeam ? ' ls-seam' : ''}${exiting ? ' ls-exit' : ''}`}
      role="status"
      aria-label="Portfolio initializing"
    >
      {/* Top half shutter: slides UP on completion */}
      <div
        className="ls-shutter ls-shutter-top"
        onTransitionEnd={handleTopTransitionEnd}
      />

      {/* Bottom half shutter: slides DOWN on completion */}
      <div className="ls-shutter ls-shutter-bottom" />

      {/* Centered loader component — placed on top of the seam */}
      <div className="ls-loader">
        <div
          className="ls-bar"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={displayText}
        >
          {/* Smooth green sweep — pure CSS animation */}
          <div
            className="ls-fill"
            style={{ animationDuration: `${BAR_MS}ms` }}
          />
          {/* Status text overlaid on top of the fill */}
          <span className="ls-label" style={{ opacity: textOpacity }}>
            {displayText}
          </span>
        </div>
      </div>
    </div>
  )
}

