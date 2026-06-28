import { useEffect } from 'react'
import { HeroArt } from './Art.jsx'
import { playMission, playStart } from '../lib/sound.js'

export default function Briefing({ game, onStart, onEdit }) {
  const levelsN = game.levels.length
  const locksN = game.levels.reduce((n, l) => n + (l.locks?.length || 0), 0)
  const summary = [`${levelsN} Levels`, `${locksN} clinical locks`, `${game.lives} lives`]

  // Play the mission theme when the opening screen appears. Browsers only allow
  // audio after a user gesture — arriving here always follows a click (sign-in,
  // Play Again, or Restart), so the gesture requirement is satisfied.
  useEffect(() => {
    playMission()
  }, [])

  function accept() {
    playStart()
    onStart()
  }

  return (
    <div className="card briefing mi">
      <div className="mi-tag"><span className="mi-dot" aria-hidden />CLASSIFIED · EYES ONLY</div>

      <div className="hero-figure"><HeroArt /></div>

      <div className="eyebrow">Mission Briefing</div>
      <h1>{game.title}</h1>
      <p className="subtitle">{game.subtitle}</p>

      <p className="mi-intro">Your mission, should you choose to accept it:</p>
      <div className="mission-summary">
        <span className="narrative-tag">Mission Summary</span>
        <ul className="mi-bullets">
          {summary.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </div>

      {game.objectives?.length > 0 && (
        <div className="objectives">
          <span className="narrative-tag">Learning objectives</span>
          <ol>
            {game.objectives.map((obj, i) => <li key={i}>{obj}</li>)}
          </ol>
        </div>
      )}

      <div className="briefing-actions">
        <button className="btn mi-accept big" onClick={accept}>
          Accept Mission →
        </button>
        <button className="btn ghost" onClick={onEdit}>
          ✎ Edit game / Import
        </button>
      </div>

      <p className="mi-selfdestruct">This briefing will not self-destruct.</p>
    </div>
  )
}
