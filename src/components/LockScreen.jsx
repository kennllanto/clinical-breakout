import { useEffect, useRef, useState } from 'react'
import Timer from './Timer.jsx'
import { LockGlyph } from './Art.jsx'

export default function LockScreen({
  lock,
  level,
  phase, // 'crack' | 'sbar'
  timers,
  attemptKey, // bumps on tag-out / fresh cohort -> resets input + timer
  lockNumber,
  totalLocks,
  checkCode, // (guess) => boolean
  onCorrect,
  onWrongCode,
  onSbarPass,
  onSbarFail,
}) {
  const [guess, setGuess] = useState('')
  const [shake, setShake] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    setGuess('')
    setShake(false)
    if (phase === 'crack') {
      const t = setTimeout(() => inputRef.current?.focus(), 50)
      return () => clearTimeout(t)
    }
  }, [attemptKey, phase, lock.id])

  function submit(e) {
    e.preventDefault()
    if (!guess.trim()) return
    if (checkCode(guess)) {
      onCorrect()
    } else {
      setShake(true)
      setTimeout(() => setShake(false), 600)
      onWrongCode()
      setGuess('')
      inputRef.current?.focus()
    }
  }

  return (
    <div className="lock-wrap">
      <div className="lock-meta">
        <span className="eyebrow">{level.title}</span>
        <span className="muted">Lock {lockNumber} of {totalLocks}</span>
      </div>

      <div className={`card lock-card ${shake ? 'shake' : ''}`}>
        <div className="lock-header">
          <div className={`lock-icon ${phase === 'sbar' ? 'open' : ''}`} aria-hidden>
            <LockGlyph open={phase === 'sbar'} />
          </div>
          <h2>{lock.label}</h2>
        </div>

        <div className="vignette">
          <span className="narrative-tag">Clinical vignette</span>
          <p>{lock.vignette}</p>
        </div>

        {phase === 'crack' ? (
          <>
            <Timer
              seconds={timers.crack}
              label="Phase 1 · Code Crack"
              resetKey={`crack-${lock.id}-${attemptKey}`}
            />
            <form className="code-form" onSubmit={submit}>
              <input
                ref={inputRef}
                className="code-input"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="Type the code…"
                autoComplete="off"
                spellCheck={false}
              />
              <button className="btn primary big" type="submit">
                Unlock
              </button>
            </form>
            <p className="hint muted">
              Codes are case- and punctuation-insensitive. Wrong code → lose a life &amp; tag out.
            </p>
          </>
        ) : (
          <>
            <div className="unlocked-banner">✅ Lock opened — deliver the SBAR handover</div>
            <Timer
              seconds={timers.sbar}
              label="Phase 2 · SBAR Handover"
              resetKey={`sbar-${lock.id}-${attemptKey}`}
            />
            <div className="rationale">
              <span className="narrative-tag">Model clinical rationale</span>
              <p>{lock.rationale}</p>
              {lock.bonus && <p className="bonus">💡 {lock.bonus}</p>}
            </div>
            <div className="facilitator">
              <span className="facilitator-label">Facilitator — did the cohort defend it?</span>
              <div className="facilitator-btns">
                <button className="btn danger" onClick={onSbarFail}>
                  ✗ Failed defence — lose a life
                </button>
                <button className="btn success big" onClick={onSbarPass}>
                  ✓ Passed — next lock
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
