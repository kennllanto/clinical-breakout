import { useEffect, useRef, useState } from 'react'

function fmt(total) {
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

// Visible, non-blocking countdown. When it reaches 0 it holds at 0:00 and
// flashes — the facilitator decides what happens, the app never auto-fails.
// `resetKey` restarts the countdown whenever it changes.
export default function Timer({ seconds, label, resetKey }) {
  const [remaining, setRemaining] = useState(seconds)
  const tick = useRef(null)

  useEffect(() => {
    setRemaining(seconds)
    clearInterval(tick.current)
    tick.current = setInterval(() => {
      setRemaining((r) => (r <= 0 ? 0 : r - 1))
    }, 1000)
    return () => clearInterval(tick.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey, seconds])

  const expired = remaining <= 0
  const warn = remaining <= 30 && !expired
  return (
    <div className={`timer ${expired ? 'expired' : warn ? 'warn' : ''}`}>
      <span className="timer-label">{label}</span>
      <span className="timer-value">{expired ? "TIME'S UP" : fmt(remaining)}</span>
    </div>
  )
}
