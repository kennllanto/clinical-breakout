export default function Victory({ game, lives, onRestart, onEdit }) {
  return (
    <div className="card endscreen victory">
      <div className="big-emoji" aria-hidden>🏆</div>
      <h1>Patient Stabilized — You Broke Out!</h1>
      <p className="subtitle">
        All {game.levels.reduce((n, l) => n + (l.locks?.length || 0), 0)} clinical locks decoded.
        Mr. Walker is hemodynamically stable.
      </p>
      <p className="lives-survived">Finished with {lives} of {game.lives} lives remaining ❤️</p>
      <div className="briefing-actions">
        <button className="btn primary big" onClick={onRestart}>↺ Play Again</button>
        <button className="btn ghost" onClick={onEdit}>✎ Edit game</button>
      </div>
    </div>
  )
}
