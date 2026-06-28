// Out of lives — gamified, arcade "Game Over" (Wreck-It Ralph-style glitch +
// falling pixels). Try Again resets lives and resumes the same lock.
import { useEffect } from 'react'
import { playGameOver } from '../lib/sound.js'

const PIXELS = Array.from({ length: 18 })

export default function GameOver({ onReset }) {
  useEffect(() => {
    playGameOver()
  }, [])

  return (
    <div className="card endscreen gameover">
      <div className="pixels" aria-hidden>
        {PIXELS.map((_, i) => (
          <span
            key={i}
            className="pixel"
            style={{
              left: `${(i * 5.5 + 3) % 97}%`,
              animationDelay: `${(i % 9) * 0.34}s`,
              animationDuration: `${2.6 + (i % 5) * 0.35}s`,
            }}
          />
        ))}
      </div>

      <div className="big-emoji" aria-hidden>💔</div>
      <h1 className="glitch" data-text="Game Over">Game Over</h1>
      <p className="subtitle">
        Try again — huddle with your team for the correct clinical code.
      </p>
      <div className="briefing-actions">
        <button className="btn primary big gameover-btn" onClick={onReset}>
          ↻ Try Again
        </button>
      </div>
    </div>
  )
}
