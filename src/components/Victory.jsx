import { useEffect } from 'react'
import { VictoryArt } from './Art.jsx'
import { playVictory } from '../lib/sound.js'

const PIXELS = Array.from({ length: 20 })

export default function Victory({ game, lives, onRestart, onEdit }) {
  const locks = game.levels.reduce((n, l) => n + (l.locks?.length || 0), 0)

  useEffect(() => {
    playVictory()
  }, [])

  return (
    <div className="card endscreen victory">
      <div className="pixels" aria-hidden>
        {PIXELS.map((_, i) => (
          <span
            key={i}
            className="pixel"
            style={{
              left: `${(i * 4.9 + 2) % 97}%`,
              animationDelay: `${(i % 10) * 0.3}s`,
              animationDuration: `${2.4 + (i % 5) * 0.35}s`,
            }}
          />
        ))}
      </div>

      <div className="victory-art-wrap"><VictoryArt /></div>
      <h1 className="glitch victory-title" data-text="MISSION COMPLETE">MISSION COMPLETE</h1>
      <p className="subtitle">
        Patient stabilized — you broke out! All {locks} clinical locks decoded; your
        patient is hemodynamically stable.
      </p>
      <p className="lives-survived">Finished with {lives} of {game.lives} lives remaining ❤️</p>
      <div className="briefing-actions">
        <button className="btn primary big" onClick={onRestart}>↺ Play Again</button>
        <button className="btn ghost" onClick={onEdit}>✎ Edit game</button>
      </div>
    </div>
  )
}
