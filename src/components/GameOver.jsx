// Out of lives — gamified "Game Over". Facilitator resets lives via Try Again,
// which resumes the same lock so the team can re-attempt the code.
export default function GameOver({ onReset }) {
  return (
    <div className="card endscreen gameover">
      <div className="big-emoji" aria-hidden>💔</div>
      <h1>Game Over</h1>
      <p className="subtitle">
        Try again — huddle with your team for the correct clinical code.
      </p>
      <div className="briefing-actions">
        <button className="btn primary big" onClick={onReset}>
          ↻ Try Again
        </button>
      </div>
    </div>
  )
}
