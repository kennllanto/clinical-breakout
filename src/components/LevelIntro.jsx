export default function LevelIntro({ level, levelNumber, totalLevels, onContinue }) {
  return (
    <div className="card level-intro">
      <div className="eyebrow">Level {levelNumber} of {totalLevels}</div>
      <h2>{level.title}</h2>
      <div className="narrative">
        <span className="narrative-tag">Patient narrative</span>
        <p>{level.narrative}</p>
      </div>
      <p className="muted">
        {level.locks.length} {level.locks.length === 1 ? 'lock' : 'locks'} in this level.
      </p>
      <button className="btn primary big" onClick={onContinue}>
        Enter Level →
      </button>
    </div>
  )
}
