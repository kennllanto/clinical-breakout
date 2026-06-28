// Lightweight Web Audio sound effects — no audio files needed.
// Tones are synthesised on the fly. A user gesture (button click) precedes
// every timer start, so the AudioContext can resume from a suspended state.

let ctx = null
let muted = false
try {
  muted = localStorage.getItem('clinical-breakout:muted') === '1'
} catch {
  /* ignore */
}

export function isMuted() {
  return muted
}

export function setMuted(v) {
  muted = !!v
  try {
    localStorage.setItem('clinical-breakout:muted', muted ? '1' : '0')
  } catch {
    /* ignore */
  }
}

function audio() {
  if (typeof window === 'undefined') return null
  const AC = window.AudioContext || window.webkitAudioContext
  if (!AC) return null
  if (!ctx) ctx = new AC()
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

function tone(freq, dur, { when = 0, type = 'sine', vol = 0.15 } = {}) {
  const c = audio()
  if (!c) return
  const t0 = c.currentTime + when
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t0)
  gain.gain.setValueAtTime(vol, t0)
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  osc.connect(gain)
  gain.connect(c.destination)
  osc.start(t0)
  osc.stop(t0 + dur + 0.02)
}

// Two-note rising cue when a phase timer starts.
export function playStart() {
  if (muted) return
  tone(587, 0.12, { type: 'sine', vol: 0.16 })
  tone(880, 0.16, { when: 0.12, type: 'sine', vol: 0.16 })
}

// Per-second beep during the final 10 seconds.
export function playTick() {
  if (muted) return
  tone(1000, 0.08, { type: 'square', vol: 0.12 })
}

// Sharper beep for the last 3 seconds.
export function playFinalTick() {
  if (muted) return
  tone(1320, 0.1, { type: 'square', vol: 0.16 })
}

// Low buzz when the clock hits zero.
export function playTimeUp() {
  if (muted) return
  tone(320, 0.35, { type: 'sawtooth', vol: 0.18 })
  tone(240, 0.45, { when: 0.18, type: 'sawtooth', vol: 0.18 })
}
