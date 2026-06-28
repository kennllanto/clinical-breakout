import { useEffect, useRef, useState } from 'react'
import { playStart, playTick, playFinalTick, playTimeUp } from '../lib/sound.js'

function fmt(total) {
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

// Visible, non-blocking countdown. When it reaches 0 it holds at 0:00 and
// flashes — the facilitator decides what happens, the app never auto-fails.
// `resetKey` restarts the countdown whenever it changes.
// Sound: a start cue when the timer (re)starts, a beep each of the final
// 10 seconds, and a buzz at zero.
export default function Timer({ seconds, label, resetKey }) {
  const [remaining, setRemaining] = useState(seconds)
  const tick = useRef(null)

  // (Re)start the countdown + play the start cue.
  useEffect(() => {
    setRemaining(seconds)
    playStart()
    clearInterval(tick.current)
    tick.current = setInterval(() => {
      setRemaining((r) => (r <= 0 ? 0 : r - 1))
    }, 1000)
    return () => clearInterval(tick.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey, seconds])

  // Beep on the final-10-seconds and at zero.
  useEffect(() => {
    if (remaining <= 0) {
      playTimeUp()
    } else if (remaining <= 3) {
      playFinalTick()
    } else if (remaining <= 10) {
      playTick()
    }
  }, [remaining])

  const expired = remaining <= 0
  const warn = remaining <= 30 && !expired
  const critical = remaining <= 10 && !expired
  return (
    <div className={`timer ${expired ? 'expired' : warn ? 'warn' : ''} ${critical ? 'critical' : ''}`}>
      <span className="timer-label">{label}</span>
      <span className="timer-value">{expired ? "TIME'S UP" : fmt(remaining)}</span>
    </div>
  )
}
