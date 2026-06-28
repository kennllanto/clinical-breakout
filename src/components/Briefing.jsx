import { HeroArt } from './Art.jsx'

export default function Briefing({ game, onStart, onEdit }) {
  const totalLocks = game.levels.reduce((n, l) => n + (l.locks?.length || 0), 0)
  return (
    <div className="card briefing">
      <div className="hero-figure"><HeroArt /></div>
      <div className="eyebrow">Clinical Briefing</div>
      <h1>{game.title}</h1>
      <p className="subtitle">{game.subtitle}</p>
      <div className="stat-row">
        <div className="stat"><b>{game.levels.length}</b><span>Levels</span></div>
        <div className="stat"><b>{totalLocks}</b><span>Locks</span></div>
        <div className="stat"><b>{game.lives}</b><span>Team Lives</span></div>
      </div>
      <div className="briefing-body">
        {game.briefing.split('\n\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
      {game.objectives?.length > 0 && (
        <div className="objectives">
          <span className="narrative-tag">Learning objectives</span>
          <ol>
            {game.objectives.map((obj, i) => (
              <li key={i}>{obj}</li>
            ))}
          </ol>
        </div>
      )}
      <div className="briefing-actions">
        <button className="btn primary big" onClick={onStart}>
          Begin the Gauntlet →
        </button>
        <button className="btn ghost" onClick={onEdit}>
          ✎ Edit game / Import
        </button>
      </div>
    </div>
  )
}
